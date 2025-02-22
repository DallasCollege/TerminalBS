var LC_Careers = {

  outputDiv: 'careers-output',
  onetImgURL: 'https://cc.emsiservices.com/images/us/onet2019/careers/',
  getData : function(Onets){

    // Define the OAuth 2.0 token endpoint and API endpoint
    const tokenUrl = 'https://auth.emsicloud.com/connect/token';
    let OnetString = Onets.join('%2C');

    // Define client credentials and other required parameters
    const clientId = 'dallascollege-marketing';
    const clientSecret = '2f0KnkHO';
    const grantType = 'client_credentials'; // or 'authorization_code', 'password', etc.
    const scope = 'careers';

    // Specific careers with OnetIDs listed in query, in DFW and with specific fields:
    var apiUrl = 'https://cc.emsiservices.com/careers/us/msa/19100/?fields=humanized-title%2Cmedian-earnings%2Cannual-openings%2Cemployment%2Cemployment-current%2Cskills&onets='+OnetString;

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

            const careers = await response.json();
            return careers;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    //console.log("apiUrl: " + apiUrl);

    // Process the data
    fetchData().then(careers => LC_Careers.processCareers(careers));
  },

  processCareers : function(careers){
    careersArr = careers.data;
    let length = Object.keys(careersArr).length;
    //console.log('length: ' + length);
    console.log(careers);

     if (length > 0){
       for (var i = 0; i < careersArr.length; i++){
         //console.log(careersArr[i]);
         LC_Careers.buildCareer(careersArr[i].attributes);
       }
     }
  },

  buildCareer : function(career){
    //console.log(career);

    // Definitions
    var c_annual_openings = '';
    var c_humanized_title = '';
    var c_median_earnings = '';
    var c_onetid = '';
    var c_outlook = 0;
    var c_outlook_arrow = c_outlook_classes = '';
    var c_employment = '';
    var c_skills = [];
    var skillLimit = 10;

    // if not undefined, set value
    if (career["annual-openings"] !== undefined){
      c_annual_openings = career["annual-openings"];
    }
    if (career["humanized-title"] !== undefined){
      c_humanized_title = career["humanized-title"];
    }
    if (career["median-earnings"] !== undefined){
      c_onetid = career["onet-id"];
    }
    if (career["median-earnings"] !== undefined){
      c_median_earnings = career["median-earnings"];

      // Divine by number of working days each year (2080) to get hourly wage
      c_median_earnings = c_median_earnings/2080;

      // Format to a whole number with commas
      c_median_earnings = Math.round(c_median_earnings).toLocaleString();
    }
    /*
    //Total Employement option
    if (career["employment"] !== undefined){
      let cEmpObj = career["employment"];
      let currentYear = new Date().getFullYear();
      let findKey = cEmpObj.find(obj => obj.year === currentYear);
      c_employment = findKey ? findKey.number.toLocaleString('en-US') : "N/A";
    }
    */
    // Projected Outlook
    if (career["employment"] !== undefined){
      let cEmpObj = career["employment"];
      let currentYear = new Date().getFullYear();

      /* old method of comparing current and last year
      //let cEmpCurrent = cEmpObj.find(obj => obj.year === currentYear);
      //let cEmpPrev = cEmpObj.find(obj => obj.year === currentYear-1);
      */

      // compare the last year in dataset with 10 years prior
      let lastIndex = cEmpObj.length - 1
      let firstIndex = lastIndex-10;
      let change = cEmpObj[lastIndex].number - cEmpObj[firstIndex].number;
      let raw_change = change / cEmpObj[firstIndex].number;
      c_outlook = Math.round(raw_change * 100); //round to the nearest number
      if (c_outlook === 0){ //don't let the outlook be zero
        c_outlook = raw_change > 0 ? 1 : -1;
      }
      // set arrow output
      if (raw_change < 0){
        c_outlook_arrow = '/TerminalBS/assets/img/pop-arrow-down-25x25.png';
        c_outlook_classes = 'arrow down';
      }else{
        c_outlook_arrow = '/TerminalBS/assets/img/pop-arrow-up-25x25.png';
        c_outlook_classes = 'arrow up';
      }
      //console.log(c_outlook +' / ' + c_outlook_arrow);
    }


    // Dump skills into array and cut off at limit
    let skillscount = career.skills.length;
    if (skillscount > 0){
      var c_skills = career.skills.map(item => item.name);
      c_skills.splice(skillLimit);
    }


    // Create container div
    const container = document.createElement('div');
    container.className = 'col-lg-6 col-md-12';

    // Create the content image box div
    const contentBox = document.createElement('div');
    contentBox.className = 'content-image-box border-cgrey-20 border-1 rounded-1 mb-3';

    // Create the left image div
    const leftDiv = document.createElement('div');
    leftDiv.className = 'col-md-4 col-sm-4 cib-left cib-img';
    const img = document.createElement('img');
    img.src = LC_Careers.onetImgURL + c_onetid + '.jpg?width=422&height=666';
    img.className = 'cib-image';
    img.alt = 'Image of ' + c_humanized_title + 'working';
    leftDiv.appendChild(img);

    // Create the right content div
    const rightDiv = document.createElement('div');
    rightDiv.className = 'col-md-8 col-sm-8 cib-right cib-content px-3 py-4';

    // Add heading
    const heading = document.createElement('h3');
    heading.className = 'lh-sm mb-2';
    heading.textContent = c_humanized_title;
    rightDiv.appendChild(heading);

    // Create container for salary, openings, and outlook
    const infoContainer = document.createElement('div');
    infoContainer.className = 'container';

    // Create row for salary, openings, and outlook
    const infoRow = document.createElement('div');
    infoRow.className = 'row';

    // Salary column
    const salaryCol = document.createElement('div');
    salaryCol.className = 'col ps-0';
    const salaryRow = document.createElement('div');
    salaryRow.className = 'row';
    const salarySubCol = document.createElement('div');
    salarySubCol.className = 'col-6 col-lg-8 col-md-6';
    const salaryP = document.createElement('p');
    const salaryData = document.createElement('span');
    salaryData.className = 'jobs-data';
    salaryData.textContent = '$' + c_median_earnings;
    const salaryHr = document.createElement('span');
    salaryHr.className = 'jobs-hr';
    salaryHr.textContent = '/hr';
    salaryP.appendChild(salaryData);
    salaryP.appendChild(salaryHr);
    salarySubCol.appendChild(salaryP);
    salaryRow.appendChild(salarySubCol);
    const salaryDesc = document.createElement('p');
    salaryDesc.className = 'lh-sm jobs-desc';
    salaryDesc.textContent = 'Median Salary';
    salaryCol.appendChild(salaryRow);
    salaryCol.appendChild(salaryDesc);

    // Job openings column
    const openingsCol = document.createElement('div');
    openingsCol.className = 'col ps-0';
    const openingsRow = document.createElement('div');
    openingsRow.className = 'row';
    const openingsSubCol = document.createElement('div');
    openingsSubCol.className = 'col-12';
    const openingsP = document.createElement('p');
    const openingsData = document.createElement('span');
    openingsData.className = 'jobs-data';
    openingsData.textContent = c_annual_openings;
    openingsP.appendChild(openingsData);
    openingsSubCol.appendChild(openingsP);
    openingsRow.appendChild(openingsSubCol);
    const openingsDesc = document.createElement('p');
    openingsDesc.className = 'lh-sm jobs-desc';
    openingsDesc.textContent = 'Job Openings';
    openingsCol.appendChild(openingsRow);
    openingsCol.appendChild(openingsDesc);

    // Projected outlook column
    const outlookCol = document.createElement('div');
    outlookCol.className = 'col ps-0';
    const outlookRow = document.createElement('div');
    outlookRow.className = 'row';
    const outlookSubCol = document.createElement('div');
    outlookSubCol.className = 'col';
    const outlookP = document.createElement('p');
    const outlookData = document.createElement('span');
    outlookData.className = 'jobs-data';
    outlookData.textContent = c_outlook + '%'; //'32%';
    const outlookImg = document.createElement('img');
    outlookImg.className = 'mb-3 ps-1 jobs-arrow';
    outlookImg.src = c_outlook_arrow; //'assets/img/pop-arrow-up-25x25.png';
    outlookImg.alt = c_outlook_classes; //'arrow up';
    outlookImg.setAttribute('aria-hidden', 'true');
    outlookP.appendChild(outlookData);
    outlookP.appendChild(outlookImg);
    outlookSubCol.appendChild(outlookP);
    outlookRow.appendChild(outlookSubCol);
    const outlookDesc = document.createElement('p');
    outlookDesc.className = 'lh-sm jobs-desc';
    outlookDesc.textContent = 'Projected Outlook';
    outlookCol.appendChild(outlookRow);
    outlookCol.appendChild(outlookDesc);

    // Append salary, openings, and outlook columns to the row
    infoRow.appendChild(salaryCol);
    infoRow.appendChild(openingsCol);
    infoRow.appendChild(outlookCol);

    // Append row to the container
    infoContainer.appendChild(infoRow);

    // Append container to the right content div
    rightDiv.appendChild(infoContainer);

    // Add horizontal line
    const hr = document.createElement('hr');
    rightDiv.appendChild(hr);

    // Add top skills heading
    const skillsHeading = document.createElement('p');
    skillsHeading.className = 'mb-1';
    const strongText = document.createElement('strong');
    strongText.textContent = 'Top Skills:';
    skillsHeading.appendChild(strongText);
    rightDiv.appendChild(skillsHeading);

    // Create the list of skills
    const skillsList = document.createElement('ul');
    skillsList.className = 'list-inline jobs-skills';

    c_skills.forEach(skill => {
        const listItem = document.createElement('li');
        listItem.textContent = skill;
        skillsList.appendChild(listItem);
    });

    rightDiv.appendChild(skillsList);

    // Append left and right divs to the content box
    contentBox.appendChild(leftDiv);
    contentBox.appendChild(rightDiv);

    // Append the content box to the container
    container.appendChild(contentBox);
    LC_Careers.outputCareer(container);
  },

  outputCareer : function(careerbox){
    // Append the container to output div
    document.getElementById(LC_Careers.outputDiv).appendChild(careerbox);
  }

}
