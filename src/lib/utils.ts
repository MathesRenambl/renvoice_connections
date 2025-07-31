import { getFromLocalStorage } from "@/components/encryption/encryption"
import { clsx, type ClassValue } from "clsx"
import { useSession } from "next-auth/react"
import { ROUTER_TYPE } from "next/dist/build/utils"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useRouter } from "next/navigation"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const apiHeader=()=>{
  const token =getFromLocalStorage('token');
  const {data:session}=useSession();

  if(session?.accessToken&&session?.memberId){
    return{
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
          memberId:session?.memberId
        }
  }else{
    return null
  }
}

type Primitive = string | number | boolean | null | undefined;
type JSONObject = { [key: string]: JSONValue };
type JSONArray = JSONValue[];
type JSONValue = Primitive | JSONObject | JSONArray;

export function getUpdatedFields(
  initialData: JSONObject,
  updatedData: JSONObject
): JSONObject {
  const changedKeys: JSONObject = {};
  const allKeys = new Set([...Object.keys(initialData), ...Object.keys(  updatedData)]);

  allKeys.forEach((key) => {
    const val1 = initialData[key];
    const val2 =   updatedData[key];

    if (Array.isArray(val1) && Array.isArray(val2)) {
      if (val1.length !== val2.length) {
        changedKeys[key] = val2;
      } else {
        const arrayChanged = val1.some((item, index) => {
          const otherItem = val2[index];
          if (
            typeof item === "object" &&
            item !== null &&
            !Array.isArray(item) &&
            typeof otherItem === "object" &&
            otherItem !== null &&
            !Array.isArray(otherItem)
          ) {
            return Object.keys(getUpdatedFields(item as JSONObject, otherItem as JSONObject)).length > 0;
          }
          return item !== otherItem;
        });

        if (arrayChanged) {
          changedKeys[key] = val2;
        }
      }
    } else if (
      typeof val1 === "object" &&
      val1 !== null &&
      !Array.isArray(val1) &&
      typeof val2 === "object" &&
      val2 !== null &&
      !Array.isArray(val2)
    ) {
      const nestedChanges = getUpdatedFields(val1 as JSONObject, val2 as JSONObject);
      if (Object.keys(nestedChanges).length > 0) {
        changedKeys[key] = nestedChanges;
      }
    } else if (val1 !== val2) {
      changedKeys[key] = val2;
    }
  });

  return changedKeys;
}


  export const redirectToPageByStatus = (status: string, router: AppRouterInstance, showAlert: (arg0?: string, arg1?: string) => void = () => {}) => {
  switch (status) {
    case "BASIC_DETAILS_COMPLETED":
    case "DOCUMENT_UPLOAD_PENDING":
    case "DOCUMENT_REJECTED":
      router.replace("/docsUpdate");
      break;

    case 'DOCUMENT_UPLOADED':
    case "DOCUMENT_VERIFICATION_PENDING":
    case "DOCUMENT_RESUBMISSION_PENDING":
      router.replace("/waitingArea");
      showAlert("Your account under verfication",'info');
      break;

    case "REGISTRATION_STARTED":
      router.replace("/signUp");
      break;

    case "ACTIVE":
      router.replace("/dashboard");
      break;

    default:
      showAlert("Unexpected user status: " + status, "info");
      break;
  }
};