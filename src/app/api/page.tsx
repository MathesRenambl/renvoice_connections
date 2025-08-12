import React from 'react'


import { usePostFetch } from '@/hooks/useFetch';

export const sendOtp= async (payLoad: any) => {
    const data =await usePostFetch("/auth/sendOtp",payLoad);
    return data;
}

export const login= async (payLoad: any) => {
    const data =await usePostFetch("/auth/login",payLoad);
    return data;
}

export const getOrgdashboard= async (payLoad: any) => {
    const data =await usePostFetch("/license/getOrgDashboard",payLoad);
    return data;
}


export const getLicenses= async (payLoad: any) => {
    const data =await usePostFetch("/license/getLicenses",payLoad);
    return data;
}

export const getConnection= async (payLoad: any) => {
    const data =await usePostFetch("/connection/getConnection",payLoad);
    return data;
}

export const getPayment= async (payLoad: any) => {
    const data =await usePostFetch("/payments/getPayment",payLoad);
    return data;
}

export const purchaseLicense= async (payLoad: any) => {
    const data =await usePostFetch("/payments/initiatePayment",payLoad);
    return data;
}

export const purchaseCredits= async (payLoad: any) => {
    const data =await usePostFetch("/payments/initiatePayment",payLoad);
    return data;
}


