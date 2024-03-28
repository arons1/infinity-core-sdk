import { CoinNotSupported } from '../../errors';
import derivations from '../config';
import { Coins, Curve } from '../registry';
import ECDSACoin from './ecdsa';
import ED25519Coin from './ed25519';
import SECP256K1Coin from './secp256k1';
const Config = (idCoin: Coins): ED25519Coin | SECP256K1Coin | ECDSACoin => {
    const derivation = derivations[idCoin];
    if (!derivation) throw new Error(CoinNotSupported);
    if (derivation.curve == Curve.ED25519)
        return new ED25519Coin(idCoin, derivation.bip44);
    else if (derivation.curve == Curve.ECDSA)
        return new ECDSACoin(idCoin, derivation.bip44);
    return new SECP256K1Coin(idCoin, derivation.bip44);
};
export default Config;
