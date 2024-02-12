import Next from "next";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_DB_BASEURL: string;
            NEXT_PUBLIC_USER_NAME: string;
            NEXT_PUBLIC_USER_PASSWORD: string;
        }
    }
}