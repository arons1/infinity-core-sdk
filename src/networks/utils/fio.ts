const isValidPublicKey = (pubkey:string) => {
    if(typeof pubkey != "string")
        return false
    return pubkey &&  pubkey.length >= 1 && pubkey.length <= 62 && /^FIO\\w+$/.test(pubkey)

}
export const isValidAddress = (address:string) => {
    if(typeof address != "string")
        return false
    if(address.startsWith('FIO'))
        return isValidPublicKey(address)
    return address &&  address.length >= 3 && address.length <= 64 && /^(?:(?=.{3,64}$)[a-zA-Z0-9]{1}(?:(?:(?!-{2,}))[a-zA-Z0-9-]*[a-zA-Z0-9]+){0,1}@[a-zA-Z0-9]{1}(?:(?:(?!-{2,}))[a-zA-Z0-9-]*[a-zA-Z0-9]+){0,1}$)/.test(address)
}