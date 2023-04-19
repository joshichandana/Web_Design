export type UserData = {
        
    firstname: string;
    lastname: string;
    phoneNumber: string;
    email: string;
    role: string;

}

export type IncidentData = {
id: string,
subject: string,
description: string,
status: string,
priority: string,
requester_id: string,
tags: Array<string>,
IncidentTypes: Array<string>,
createdAt: string,
customer:string,
agent:string,
updatedAt: string,
userData: UserData
}

export const resolutionTypes = {
    firstResponse : "FIRST_RESPONSE",
    resolution : "RESOLUTION"
}

export const statusOptions = ["Open", "In Progress", "Resolved", "Closed"];
export const priorities = ["Low", "Medium", "High", "Urgent"];

export const emptyIncident = {
    id: "",
    subject: "",
    description: "",
    status: "",
    priority: "",
    requester_id: "",
    tags: [""],
    createdAt: "",
    updatedAt: "",
    userData: {
        firstname : "",
        lastname: "",
        phoneNumber: "",
        email: "",
        role: ""
    }
}