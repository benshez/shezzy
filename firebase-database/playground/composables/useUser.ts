import { useState } from '#app'

export const useUser = () => useState<any>('user', () => {
    return {
        name: "Sheryl",
        given_name: "Sheryl",
        email: "benshez@gmail.com",
        picture: "",
        email_verified: true,
        sub: "benshez@gmail.com",
    }
})