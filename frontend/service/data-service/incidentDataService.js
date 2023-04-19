import { API, INCIDENT_URL } from '../../constants'

export const putIncidentData = async (IncidentData) => {

    // const Incident = req.body;
    // const updatedIncident = await IncidentService.update(req.params.id, Incident, { new: true });
    let IncidentDbID = IncidentData["id"];
    delete IncidentData["id"];
    delete IncidentData["userData"];
    delete IncidentData["createdAt"];
    delete IncidentData["updatedAt"];

    let url = `${API}${INCIDENT_URL}${IncidentDbID}`;
    let body = JSON.stringify(IncidentData);

    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    }).then(res => {
        // console.log(res);
        return res.json();
    }).then(
            data => {
                // console.log(data)
                return data.data;
            }
        );

}

export const getIncidentData = async (IncidentDbID) => {


    let url = `${API}${INCIDENT_URL}${IncidentDbID}`;

    return fetch(url)
        .then(res => {
            // console.log(res);
            return res.json();
        })
        .then(
            data => {
                // console.log(data)
                return data.data;
            }
        );

    // switch(id){
    //     case "638d2bc9dccd0ecc54db222f" : return sampleIncidentData1;
    //     case "638d2f9bdccd0ecc54db2232" : return sampleIncidentData2;
    //     case "638d2fc0dccd0ecc54db2234" : return sampleIncidentData3;
    // }


}

export const postIncidentData = async (IncidentData) => {

    let url = `${API}${INCIDENT_URL}`;

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(IncidentData)
    }).then(res => {
        // console.log(res);
        return res.json();
    })
    .then(
        data => {
            // console.log(data)
            return data.data;
        }
    );;
}

const sampleIncidentData1 = {
    "id": "638d2bc9dccd0ecc54db222f",
    "subject": "test-v1-change",
    "description": "Hi,\n\n television I ordered from your site was delivered with a cracked screen. I need some help with a refund or a replacement.\n\n Here is the order number FD07062010 \n\n\n Thanks,\n Sarah",
    "status": "Open",
    "priority": "High",
    "requester_id": "my_1",
    "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
    "createdAt": "2023-04-29T00:32:46.468Z",
    "updatedAt": "2023-03-18T00:33:30.834Z",
    "userData": {
        "firstname": "test123",
        "lastname": "desss",
        "phoneNumber": "Open",
        "email": "High",
        "role": "userID"
    }
}

const sampleIncidentData2 = Object.assign({}, sampleIncidentData1);
sampleIncidentData2.id = "638d2f9bdccd0ecc54db2232"

const sampleIncidentData3 = Object.assign({}, sampleIncidentData1);
sampleIncidentData3.id = "638d2fc0dccd0ecc54db2234"