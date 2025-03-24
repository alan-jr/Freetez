"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taquito_1 = require("@taquito/taquito");
// Initialize Tezos toolkit with an RPC node
const Tezos = new taquito_1.TezosToolkit('https://ghostnet.smartpy.io'); // Change for mainnet if needed
exports.default = Tezos;
