export interface User {
    id: number;
    uuid: string;
    username: string;
    title: string;
    email: string;
    locale: string;
    emailOnlyAuth: boolean;
    hasPassword: boolean;
    protected: boolean;
    thumb: string;
    authToken: string;
    mailingListStatus: string;
    mailingListActive: boolean;
    scrobbleTypes: string;
    country: string;
    subscription: {
        active: boolean;
        subscribedAt: string;
        status: string;
        paymentService: string;
        plan: string;
        features: string[];
    };
    subscriptionDescription: string;
    restricted: boolean;
    anonymous: boolean;
    home: boolean;
    guest: boolean;
    homeSize: number;
    homeAdmin: boolean;
    maxHomeSize: number;
    certificateVersion: number;
    rememberExpiresAt: number;
    profile: {
        autoSelectAudio: boolean;
        defaultAudioLanguage: string;
        defaultSubtitleLanguage: string;
        autoSelectSubtitle: number;
        defaultSubtitleAccessibility: number;
        defaultSubtitleForced: number;
    };
    entitlements: string[];
    roles: string[];
    subscriptions: [
        {
            id: number;
            mode: string;
            renewsAt: string;
            endsAt: string;
            type: string;
            transfer: string;
            state: string;
        }
    ],
    services: [
        {
            identifier: string;
            endpoint: string;
            token: string;
            status: string;
        }
    ];
    adsConsent: boolean;
    adsConsentSetAt: number;
    adsConsentReminderAt: number;
    twoFactorEnabled: boolean;
    backupCodesCreated: boolean;
}

export interface Connection {
    protocol: string;
    address: string;
    port: number;
    uri: string;
    local: boolean;
    relay: boolean;
    IPv6: boolean;
}

export interface Resource {
    name: string;
    product: string;
    productVersion: string;
    platform: string;
    platformVersion: string;
    device: string;
    clientIdentifier: string;
    createdAt: string;
    lastSeenAt: string;
    provides: string;
    ownerId: number;
    sourceTitle: string;
    publicAddress: string;
    accessToken: string;
    owned: boolean;
    home: boolean;
    synced: boolean;
    relay: boolean;
    presence: boolean;
    httpsRequired: boolean;
    publicAddressMatches: boolean;
    dnsRebindingProtection: boolean;
    natLoopbackSupported: boolean;
    connections: Connection[];
}

export interface Error {
    code: number;
    message: string;
}
