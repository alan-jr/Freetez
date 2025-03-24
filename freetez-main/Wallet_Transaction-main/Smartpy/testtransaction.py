# Testing Transactions for the Escrow Contract
import smartpy as sp

@sp.add_test(name="Escrow Transaction Tests")
def test():
    scenario = sp.test_scenario()
    admin = sp.address("tz1-admin-address")
    client = sp.address("tz1-client-address")
    freelancer = sp.address("tz1-freelancer-address")
    contract = EscrowContract(admin)
    scenario += contract

    scenario.h1("Testing Transactions")
    
    scenario += contract.create_escrow(
        client=client,
        freelancer=freelancer,
        amount=sp.mutez(2000000),
        token=sp.address("tz1-token-address"),
        token_standard="XTZ",
        deadline_seconds=7200
    ).run(sender=client)

    scenario += contract.release_payment(0).run(sender=client)
