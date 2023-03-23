export interface IUser{
    message: string;
    user: {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        username: string;
        email: string;
        password: string;
        refreshToken: string;
        verified: boolean;
        role: "user" | "premium";
        salt: string;
        periodData : {
            lastPeriodBegin: string;
            periodDuration: string;
            menstruationDuration: string;
        }
    };
    accessToken: string;
}