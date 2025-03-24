# SmartPy Escrow Contract for Tezos
import smartpy as sp

class EscrowContract(sp.Contract):
    def __init__(self, admin):
        self.init(
            admin=admin,
            escrows=sp.big_map(tkey=sp.TNat, tvalue=sp.TRecord(
                client=sp.TAddress,
                freelancer=sp.TAddress,
                amount=sp.TMutez,
                token=sp.TAddress,
                token_standard=sp.TString,
                released=sp.TBool,
                dispute=sp.TBool,
                deadline=sp.TTimestamp
            )),
            escrow_counter=sp.nat(0)
        )
    
    @sp.entry_point
    def create_escrow(self, params):
        sp.verify(sp.sender == params.client, "Only client can create escrow")
        escrow_id = self.data.escrow_counter
        self.data.escrows[escrow_id] = sp.record(
            client=params.client,
            freelancer=params.freelancer,
            amount=params.amount,
            token=params.token,
            token_standard=params.token_standard,
            released=False,
            dispute=False,
            deadline=sp.now.add_seconds(params.deadline_seconds)
        )
        self.data.escrow_counter += 1
    
    @sp.entry_point
    def release_payment(self, escrow_id):
        escrow = self.data.escrows[escrow_id]
        sp.verify(sp.sender == escrow.client, "Only client can release payment")
        sp.verify(~escrow.released, "Payment already released")
        sp.verify(sp.now < escrow.deadline, "Escrow expired")
        self.transfer_funds(escrow.freelancer, escrow.amount, escrow.token, escrow.token_standard)
        self.data.escrows[escrow_id].released = True
    
    def transfer_funds(self, recipient, amount, token, token_standard):
        if token_standard == "XTZ":
            sp.send(recipient, amount)
        elif token_standard == "FA1.2":
            sp.transfer(
                sp.record(from_=sp.self_address, to_=recipient, value=amount),
                sp.mutez(0),
                sp.contract(sp.TRecord(from_=sp.TAddress, to_=sp.TAddress, value=sp.TNat), token).open_some()
            )

@sp.add_test(name="Escrow Contract Test")
def test():
    scenario = sp.test_scenario()
    admin = sp.address("tz1-admin-address")
    client = sp.address("tz1-client-address")
    freelancer = sp.address("tz1-freelancer-address")
    contract = EscrowContract(admin)
    scenario += contract
    scenario.h1("Creating Escrow")
    scenario += contract.create_escrow(
        client=client,
        freelancer=freelancer,
        amount=sp.mutez(1000000),
        token=sp.address("tz1-token-address"),
        token_standard="XTZ",
        deadline_seconds=3600
    ).run(sender=client)

    scenario.h1("Releasing Payment")        
    scenario += contract.release_payment(0).run(sender=client)
    scenario.verify(contract.data.escrows[0].released)
    scenario.verify(contract.balance == sp.mutez(0))
    scenario.verify(scenario.stored_contract.balance == sp.mutez(1000000))
    scenario.verify(scenario.stored_contract.data.escrows[0].released)