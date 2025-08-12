import React, { useEffect, useState } from "react";
const Url="http://192.168.1.31:8000"



export const usePostFetch = async (endPoint: any, data: any) => {

    console.log(endPoint, data)
    const payLoad = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiY2hhZHJ1IiwiYWdlIjoiMTgiLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3NzE0MjY3MDd9.0g4t7HMzscJhxbom0GbrptlOpfMkTCkT9tvNJ-RZ4fA",
        },
        body: JSON.stringify({
            ...data,
        }),
    };

    try {
        console.log(endPoint, payLoad)
        const response = await fetch(`${Url}${endPoint}`, payLoad);
        if (!response.ok) {
            const err = await response.text();
            throw new Error(err);
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Api error", error);
        throw error;
    }
};
