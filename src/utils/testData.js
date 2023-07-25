export const testJobToWorkWith = {
    "job_number": crypto.randomUUID(),
    "job_title": "testing job",
    "description": "testing job description",
    "skills": "testing skills",
    "qualification": "testing qualifications required",
    "job_category": "freelancer",
    "type_of_job": "Full time",
    "payment": "30usd per week",
    "is_active": true,
    "time_interval": "3 months",
    "general_terms": [
        "genTerm1",
        "genTerm2",
        "genTerm3",
    ],
    "technical_specification": [
        "tecTerm1",
        "tecTerm2",
        "tecTerm3",
    ], 
    "workflow_terms": [
        "workTerm1",
        "workTerm2",
        "workTerm3",
    ],
    "other_info": [
        "otherTerm1",
        "otherTerm2",
        "otherTerm3",
    ],
    "company_id": "538573dsjdjadna84",
    "data_type": "real",
    "created_by": "ayoola",  
}

const [ threadOneId, threadTwoId, threadThreeId ] = [ crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID() ]
export const testThreadsToWorkWith = [
  {
    _id: threadOneId,
    image: 'https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zml4fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60',
    thread: 'Login button not working',
    created_by: 'ayoolaa_',
    team_alerted_id: '32302942948',
    current_status: 'In progress',
    previous_statuses: ['Created'],
    comments: [
      {
        user: 'sagar-hr-hiring',
        comment: "Thanks for noting! We're looking into it",
        thread_id: threadOneId,
      },
    ]
  },
  {
    _id: threadTwoId,
    thread: 'App keeps crashing after i use for 10 minutes',
    created_by: 'sagar-hr-hiring',
    team_alerted_id: '32302934342948',
    current_status: 'Created',
    previous_statuses: [],
    comments: [
      {
        user: 'sagar-hr-hiring',
        comment: "Hi please i have been struggling with this",
        thread_id: threadTwoId,
      },
    ]
  },
  {
    _id: threadTwoId,
    thread: 'App keeps crashing after i use for 10 minutes',
    created_by: 'sagar-hr-hiring',
    team_alerted_id: '32302934342948',
    current_status: 'Created',
    previous_statuses: [],
    comments: [
      {
        user: 'sagar-hr-hiring',
        comment: "Hi please i have been struggling with this",
        thread_id: threadTwoId,
      },
    ]
  },
  {
    _id: threadThreeId,
    image: 'https://images.unsplash.com/photo-1576613109753-27804de2cba8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZpeHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60',
    thread: 'Styles not looking good on mobile',
    created_by: 'zeke-hr-hiring',
    team_alerted_id: '323029ewew42948',
    current_status: 'Completed',
    previous_statuses: ['Created', 'In progress'],
    comments: [
      {
        user: 'ayoolaa_',
        comment: "Thanks for noting! We're looking into it",
        thread_id: threadThreeId,
      },
    ]
  },
]

export const testTasksToWorkWithForNow = [
  {
    _id: "64175d43543974729c6b1208",
    eventId: "FB1010000000000000000000003004",
    project: "Hr Hiring",
    applicant: "ayoolaa",
    task: "Testing task 1",
    status: "Incomplete",
    task_added_by: "ayoolaa",
    data_type: "Real_Data",
    company_id: "63a2b3fb2be81449d3a30d3f",
    task_created_date: "Sun Mar 19 2023 20:05:14",
    task_updated_date: "",
  },
  {
    _id: "64175d718a28dc1674653581",
    eventId: "FB1010000000000000000000003004",
    project: "Hr Hiring",
    applicant: "ayoolaa",
    task: "Testing task 1",
    status: "Incomplete",
    task_added_by: "ayoolaa",
    data_type: "Real_Data",
    company_id: "63a2b3fb2be81449d3a30d3f",
    task_created_date: "Mon Mar 20 2023 20:05:14",
    task_updated_date: "",
  },
  {
    _id: "64175da5543974729c6b120e",
    eventId: "FB1010000000000000000000003004",
    project: "Hr Hiring",
    applicant: "ayoolaa",
    task: "Testing task 1",
    status: "Incomplete",
    task_added_by: "ayoolaa",
    data_type: "Real_Data",
    company_id: "63a2b3fb2be81449d3a30d3f",
    task_created_date: "Tue Mar 21 2023 20:05:14",
    task_updated_date: "",
  },
  {
    _id: "64175db89979d691c9c00489",
    eventId: "FB1010000000000000000000003004",
    project: "Hr Hiring",
    applicant: "ayoolaa",
    task: "Testing task 2",
    status: "Incomplete",
    task_added_by: "ayoolaa",
    data_type: "Real_Data",
    company_id: "63a2b3fb2be81449d3a30d3f",
    task_created_date: "Wed Mar 22 2023 20:05:14",
    task_updated_date: "",
  },
  {
    _id: "64175dcf9979d691c9c0048d",
    eventId: "FB1010000000000000000000003004",
    project: "Hr Hiring",
    applicant: "ayoolaa",
    task: "Testing task 3",
    status: "Incomplete",
    task_added_by: "ayoolaa",
    data_type: "Real_Data",
    company_id: "63a2b3fb2be81449d3a30d3f",
    task_created_date: "Thu Mar 23 2023 20:05:14",
    task_updated_date: "",
  },
  {
    _id: "64175de28a28dc1674653589",
    eventId: "FB1010000000000000000000003004",
    project: "Hr Hiring",
    applicant: "ayoolaa",
    task: "Testing task 4",
    status: "Incomplete",
    task_added_by: "ayoolaa",
    data_type: "Real_Data",
    company_id: "63a2b3fb2be81449d3a30d3f",
    task_created_date: "Fri Mar 24 2023 20:05:14",
    task_updated_date: "",
  },
  {
    _id: "64175e108a28dc167465358d",
    eventId: "FB1010000000000000000000003004",
    project: "Hr Hiring",
    applicant: "ayoolaa",
    task: "Testing task 5",
    status: "Incomplete",
    task_added_by: "ayoolaa",
    data_type: "Real_Data",
    company_id: "63a2b3fb2be81449d3a30d3f",
    task_created_date: "Sat Mar 25 2023 20:05:14",
    task_updated_date: "",
  },
  {
    _id: "64175e26ef4580aebca7f296",
    eventId: "FB1010000000000000000000003004",
    project: "Hr Hiring",
    applicant: "ayoolaa",
    task: "Testing task 8",
    status: "Incomplete",
    task_added_by: "ayoolaa",
    data_type: "Real_Data",
    company_id: "63a2b3fb2be81449d3a30d3f",
    task_created_date: "Sun Mar 26 2023 20:05:14",
    task_updated_date: "",
  },
  {
    _id: "64175e26ef4580aebca7f296",
    eventId: "FB1010000000000000000000003004",
    project: "Workflow AI",
    applicant: "ayoolaa",
    task: "Testing task",
    status: "Incomplete",
    task_added_by: "ayoolaa",
    data_type: "Real_Data",
    company_id: "63a2b3fb2be81449d3a30d3f",
    task_created_date: "Mon Mar 20 2023 20:05:14",
    task_updated_date: "",
  },
  {
    _id: "64175e26ef4580aebca7f296",
    eventId: "FB1010000000000000000000003004",
    project: "Workflow AI",
    applicant: "ayoolaa",
    task: "Testing task 2",
    status: "Incomplete",
    task_added_by: "ayoolaa",
    data_type: "Real_Data",
    company_id: "63a2b3fb2be81449d3a30d3f",
    task_created_date: "Tue Mar 21 2023 20:05:14",
    task_updated_date: "",
  },
  {
    _id: "64175e26ef4580aebca7f296",
    eventId: "FB1010000000000000000000003004",
    project: "QR Code",
    applicant: "ayoolaa",
    task: "Testing task",
    status: "Incomplete",
    task_added_by: "ayoolaa",
    data_type: "Real_Data",
    company_id: "63a2b3fb2be81449d3a30d3f",
    task_created_date: "Wed Mar 22 2023 20:05:14",
    task_updated_date: "",
  },
  {
    _id: "64175e26ef4580aebca7f296",
    eventId: "FB1010000000000000000000003004",
    project: "QR Code",
    applicant: "boxboy",
    task: "Testing task 90",
    status: "Incomplete",
    task_added_by: "boxboy",
    data_type: "Real_Data",
    company_id: "63a2b3fb2be81449d3a30d3f",
    task_created_date: "Wed Mar 22 2023 20:05:14",
    task_updated_date: "",
  },
  {
    _id: "64175e26ef4580aebca7f296",
    eventId: "FB1010000000000000000000003004",
    project: "QR Code",
    applicant: "boxboy",
    task: "Working task",
    status: "Incomplete",
    task_added_by: "boxboy",
    data_type: "Real_Data",
    company_id: "63a2b3fb2be81449d3a30d3f",
    task_created_date: "Thu Mar 23 2023 20:05:14",
    task_updated_date: "",
  },
  {
    _id: "64175e26ef4580aebca7f296",
    eventId: "FB1010000000000000000000003004",
    project: "Wifi Automation",
    applicant: "boxboy",
    task: "Automation task",
    status: "Incomplete",
    task_added_by: "boxboy",
    data_type: "Real_Data",
    company_id: "63a2b3fb2be81449d3a30d3f",
    task_created_date: "Tue Mar 21 2023 20:05:14",
    task_updated_date: "",
  },
];

export const continentsData = {
  Africa: [
    "Algeria",
    "Angola",
    "Benin",
    "Botswana",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde/Cape Verde",
    "Cameroon",
    "Central African Republic",
    "Chad",
    "Comoros",
    "Congo/Republic of the Congo",
    "Democratic Republic of the Congo",
    "Djibouti",
    "Egypt",
    "Equatorial Guinea",
    "Eritrea",
    "Eswatini",
    "Ethiopia",
    "Gabon",
    "Gambia, The",
    "Ghana",
    "Guinea",
    "Guinea-Bissau",
    "Ivory Coast/Republic of Côte d'Ivoire",
    "Kenya",
    "Lesotho",
    "Liberia",
    "Libya",
    "Madagascar",
    "Malawi",
    "Mali",
    "Mauritania",
    "Mauritius",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Niger",
    "Nigeria",
    "Rwanda",
    "Sao Tome and Principe",
    "Senegal",
    "Seychelles",
    "Sierra Leone",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Sudan",
    "Tanzania",
    "Togo",
    "Tunisia",
    "Uganda",
    "Zambia",
    "Zimbabwe",
  ],
  Asia: [
    "Afghanistan",
    "Armenia",
    "Azerbaijan",
    "Bahrain",
    "Bangladesh",
    "Bhutan",
    "British Indian Ocean Territory",
    "Brunei",
    "Cambodia",
    "China",
    "Cyprus",
    "Egypt",
    "Georgia",
    "Hong Kong",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Israel",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Lebanon",
    "Macau",
    "Malaysia",
    "Maldives",
    "Mongolia",
    "Myanmar",
    "Nepal",
    "North Korea",
    "Oman",
    "Pakistan",
    "Palestine",
    "Philippines",
    "Qatar",
    "Russia",
    "Saudi Arabia",
    "Singapore",
    "South Korea",
    "Sri Lanka",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Thailand",
    "Timor-Leste/East Timor",
    "Turkey",
    "Turkmenistan",
    "United Arab Emirates",
    "Uzbekistan",
    "Vietnam",
    "Yemen",
  ],
  Europe: [
    "Albania",
    "Andorra",
    "Armenia",
    "Austria",
    "Azerbaijan",
    "Belarus",
    "Belgium",
    "Bosnia and Herzegovina",
    "Bulgaria",
    "Croatia",
    "Cyprus",
    "Czechia/Czech Republic",
    "Denmark",
    "Estonia",
    "Finland",
    "France",
    "Georgia",
    "Germany",
    "Greece",
    "Hungary",
    "Iceland",
    "Ireland",
    "Italy",
    "Kazakhstan",
    "Latvia",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Malta",
    "Moldova",
    "Monaco",
    "Montenegro",
    "Netherlands",
    "North Macedonia",
    "Norway",
    "Poland",
    "Portugal",
    "Romania",
    "Russia",
    "San Marino",
    "Serbia",
    "Slovakia",
    "Slovenia",
    "Spain",
    "Sweden",
    "Switzerland",
    "Turkey",
    "Ukraine",
    "United Kingdom",
    "Vatican City",
  ],
  "North America": [
    "Antigua and Barbuda",
    "Bahamas",
    "Barbados",
    "Belize",
    "Canada",
    "Costa Rica",
    "Cuba",
    "Dominica",
    "Dominican Republic",
    "El Salvador",
    "Grenada",
    "Guatemala",
    "Haiti",
    "Honduras",
    "Jamaica",
    "Mexico",
    "Nicaragua",
    "Panama",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Trinidad and Tobago",
    "United States of America",
  ],
  Oceania: [
    "Australia",
    "Fiji",
    "Kiribati",
    "Marshall Islands",
    "Micronesia",
    "Nauru",
    "New Zealand",
    "Palau",
    "Papua New Guinea",
    "Samoa",
    "Solomon Islands",
    "Tonga",
    "Tuvalu",
    "Vanuatu",
  ],
  "South America": [
    "Argentina",
    "Bolivia",
    "Brazil",
    "Chile",
    "Colombia",
    "Ecuador",
    "Guyana",
    "Paraguay",
    "Peru",
    "Suriname",
    "Uruguay",
    "Venezuela",
  ],
  Antarctica: [],
  "default contient": [],
};
