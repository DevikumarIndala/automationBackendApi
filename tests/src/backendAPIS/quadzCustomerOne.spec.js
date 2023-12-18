const { test } = require('@playwright/test');
const axios = require('axios');
const Url = 'http://98.70.33.161:8118/api/v1/'
const accessToken='e93f8f1864008f778b4111b6a7e9ee5cf4bc2c35';


test("API Login Test", async ({}) => {
    const loginData = {
        username: 'devi',
        password: '1234',
    };

    try {
        const response = await axios.post(Url+ "login", loginData);
        console.log(response.data); // Log the response data for verification
    } catch (error) {
        console.error('Login failed:', error.message);
    }
});

test("API Get Test", async ({}) => {
    try {
    
      const headers = {
        
          "Content-Type": "application/json",
          "accesstoken": accessToken
      }

        
        const response = await axios.get(Url + "tickets", {headers
           
        });

        console.log(response.data); 
    } catch (error) {
        console.error('GET request failed:', error.message);
    }
});

test("API GetTicket_by_Id", async ({}) => {
    try {
    
      const headers = {
        
          "Content-Type": "application/json",
          "accesstoken": accessToken
      }

        
        const response = await axios.get(Url + "tickets/1157", {headers
           
        });

        console.log(response.data); 
    } catch (error) {
        console.error('GET request failed:', error.message);
    }
});

test("API Create Test", async () => {
    try {
        const dynamicSubject = "test!@#%$~$$%^&&*:$$%%^#$#@%$%&^*&^%$^&";
        const dynamicIssue = "Welcome to the app";

        const headers = {
            "Content-Type": "application/json",
            "accesstoken": accessToken,
        };

        
        const getResponse = await axios.get(Url + "tickets/", { headers });
        console.log('GET Response:', getResponse.data);

     
        const postResponse = await axios.post(Url + "tickets/create",
            {
                "owner": "655ee1c669cf0683317e1a07",
                "subject": dynamicSubject,
                "group": "6559a7192dbb22c4b397e00e",
                "type": "6559a7192dbb22c4b397e00a",
                "tags": [],
                "priority": "6559a74394fbe95b81b0e937",
                "issue": dynamicIssue,
                "socketid": "e0TWwYGnl7dfhCuAAAA4",
                "assignee": "655ee1c669cf0683317e1a07",
            },
            { headers }
        );
        console.log('POST Response:', postResponse.data);

    } catch (error) {
        console.error('Request failed:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        }
    }
});

test("API Post CreateComment", async () => {
    try {
        const commentData = {
            "_id": "657c293b8729b3dba0c38b7b", //ticket id
            "comment": "Hi Check API testing comment added"


        };
       

        const response = await axios.post(Url+"tickets/addcomment", commentData, {
            headers: {
                "Content-Type": "application/json",
                "accesstoken": accessToken,
            },
        });
        console.log(response,"the changes")

    } catch (error) {
        console.error("Error in CreateComment API test:", error.message);
        throw error;
    }
});

test("Create Note API Test", async () => {
  const noteData = {
    "ticketid": "657c293b8729b3dba0c38bbc",
    "note": "Hi Check ApiNote"
  };

  const headers = {
    "Content-Type": "application/json",
    "accesstoken": accessToken
  };

  try {
    const response = await axios.post(Url + "tickets/addnote", noteData, { headers });
    console.log('Note created successfully:', response.data);
    
  } catch (error) {
    console.error('Error creating note:', error.response ? error.response.data : error.message);
;
  }
});


test("Update API Test", async () => {
    const updateData = {
      group: '65255315e70f67f0a789eb74',
      issue: 'update issue1',
      subject: 'Update subject on ticket',
      notes: [{ note: 'Hi update ApiNote' }]
    };
  
    const headers = {
      "Content-Type": "application/json",
      "accesstoken": accessToken
    };
  
    try {
      const response = await axios.put(Url + "tickets/657c293b8729b3dba0c38bbc", updateData, { headers });
      console.log('Update successful:', response.data);
    } catch (error) {
      console.error('Error updating data:', error.response ? error.response.data : error.message);
    }
  });


test.only("Ticket Status API Test", async () => {
    const apiUrl = Url + "tickets/status/6559a7192dbb22c4b397e001";
    const ticketId = "657c293b8729b3dba0c38bbc";

    const headers = {
        "Content-Type": "aplication/json",
        "accesstoken": accessToken
    };

    try {
        console.log("Making API request to:", `${apiUrl}/tickets/${ticketId}`);
        console.log("Headers:", headers);

        const response = await axios.get(`${apiUrl}/tickets/${ticketId}`, { headers });

        console.log("API Response:", response.data);

        const ticketStatus = response.data.status;
        expect(ticketStatus).toBeDefined();
    } catch (error) {
        console.error("Error fetching ticket status:", error.message);
        throw new Error(`Error fetching ticket status: ${error.message}`);
    }
});

