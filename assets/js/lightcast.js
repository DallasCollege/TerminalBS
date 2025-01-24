// Define the OAuth 2.0 token endpoint and API endpoint
const tokenUrl = 'https://auth.emsicloud.com/connect/token';
const apiUrl = 'https://cc.emsiservices.com/careers/us/msa/19100/13-2011.00?fields=humanized-title%2Cmedian-earnings%2Cannual-openings%2Cskills'; //example for Accountants and Auditors
/*
apiUrl: "Careers" category / country / "msa" (could also be whole country, state, zip etc) / DFW's MSA / desired career's onetid ?fields= see below. Comma separated (%2C)

Desired fields:

'annual-openings'
'humanized-title'
'median-earnings'
'onet-id'
'skills' (cap at 10?)
job growth % - not sure actual field name

Docs/References:

API: https://docs.lightcast.dev/apis/careers
MSA: https://proximityone.com/metros/guide/index.htm?misa_msa.htm
O*NET lookup: https://www.onetonline.org/
*/

// Define your client credentials and other required parameters
const clientId = 'dallascollege-marketing';
const clientSecret = '2f0KnkHO';
const grantType = 'client_credentials'; // or 'authorization_code', 'password', etc.
const scope = 'careers';


// Function to get the OAuth 2.0 access token
async function getAccessToken() {
    const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: grantType,
            scope: scope,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to obtain access token');
    }

    const data = await response.json();
    return data.access_token;
}

// Function to fetch data from the API using the access token
async function fetchData() {
    try {
        const accessToken = await getAccessToken();

        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

console.log("apiUrl: " + apiUrl);

// Call the function and log the result
fetchData().then(data => console.log(data));
