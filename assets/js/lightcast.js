// Define the OAuth 2.0 token endpoint and API endpoint
const tokenUrl = 'https://auth.emsicloud.com/connect/token';
const apiUrl = 'https://cc.emsiservices.com/careers/us/categories';
//https://cc.emsiservices.com/careers/us/msa/10100/13-2011.00?fields=humanized-title%2Cmedian-earnings%2Cpercent-female%2Cpercent-male

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

// Call the function and log the result
fetchData().then(data => console.log(data));
