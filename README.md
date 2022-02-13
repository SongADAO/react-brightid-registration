# React BrightID Registration

## Install

    npm install react-brightid-registration

## Use With Relay

### Import

```
import { BrightIDRegistrationViaRelay } from "react-brightid-registration";
```

### Use

```
<BrightIDRegistrationViaRelay
    context="snapshot"
    contractAddr="__YOUR_REGISTRATION_CONTRACT_ADDRESS__"
    mainnetRpcUrl="https://mainnet.infura.io/v3/__YOUR_INFURA_ID__"
    walletConnectInfuraId="__YOUR_INFURA_ID__"
    relayVerificationURL="__URL_OF_RELAY_REGISTRATION_ENDPOINT__"
/>
```

### Other Default Options

```
appStoreAndroid="https://play.google.com/store/apps/details?id=org.brightid"
appStoreIos="https://apps.apple.com/us/app/brightid/id1428946820"
brightIdMeetUrl="https://meet.brightid.org"
deepLinkPrefix="brightid://link-verification/http:%2f%2fnode.brightid.org"
registrationChainId="74"
registrationRpcUrl="https://idchain.one/rpc/"
verificationUrl="https://app.brightid.org/node/v5/verifications"
```

## Use Without Relay

### Import

```
import { BrightIDRegistration } from "react-brightid-registration";
```

### Use

```
<BrightIDRegistration
    context="snapshot"
    contractAddr="__YOUR_REGISTRATION_CONTRACT_ADDRESS__"
    mainnetRpcUrl="https://mainnet.infura.io/v3/__YOUR_INFURA_ID__"
    walletConnectInfuraId="__YOUR_INFURA_ID__"
/>
```

### Other Default Options

```
appStoreAndroid="https://play.google.com/store/apps/details?id=org.brightid"
appStoreIos="https://apps.apple.com/us/app/brightid/id1428946820"
brightIdMeetUrl="https://meet.brightid.org"
deepLinkPrefix="brightid://link-verification/http:%2f%2fnode.brightid.org"
faucetClaimURL="https://idchain.one/begin/api/claim"
registrationBlockExplorerUrl="https://explorer.idchain.one"
registrationBlockExplorerTxnPath="/tx/"
registrationChainId="74"
registrationChainName="IDChain"
registrationIconUrl="https://apps.brightid.org/logos/idchain.png"
registrationRpcUrl="https://idchain.one/rpc/"
registrationTokenDecimal="18"
registrationTokenName="Eidi"
verificationUrl="https://app.brightid.org/node/v5/verifications"
```
