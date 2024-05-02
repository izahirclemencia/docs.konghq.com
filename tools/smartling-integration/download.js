const fs = require('fs');
const path = require('path');

const projectId = process.env.PROJECT_ID;
const userId = process.env.USER_IDENTIFIER;
const jobId = process.env.JOB_ID;
const userSecret = process.env.USER_SECRET;
const translatedContentPath = process.env.TRANSLATED_CONTENT_PATH;
const locale = process.env.LOCALE || 'ja';

// if (!projectId || !userId || !userSecret || !jobId || !translatedContentPath) {
//   console.error("Missing environment variables.");
//   process.exit(1);
// }

const {
  ListJobFilesParameters,
  Logger,
  SmartlingApiClientBuilder,
  SmartlingJobsApi,
  SmartlingFilesApi
} = require("smartling-api-sdk-nodejs");

// const apiBuilder = new SmartlingApiClientBuilder()
//     .setLogger(console)
//     .setBaseSmartlingApiUrl("https://api.smartling.com")
//     .setHttpClientConfiguration({ timeout: 10000 })
//     .authWithUserIdAndUserSecret(userId, userSecret);

async function getFilesListForJob(projectId, jobId) {
  try {
    const jobsApi = apiBuilder.build(SmartlingJobsApi);
    const limit = 1000;
    let offset = 0;
    let fileUris = [];
    let totalCount = 0;
    let params = new ListJobFilesParameters();

    do {
      params.setOffset(offset).setLimit(limit);
      let response = await jobApi.getJobFiles(projectId, jobId, params);
      if (response.code === 200) {
        totalCount = response.data.totalCount;
        fileUris.push(...response.data.items.map(f => f.uri));
      } else {
        // handle errors
        console.log(`There was an error fetching the files for JobId: ${jobId}, offset: ${offset}`);
        process.exit(1)
      }
      offset += limit;
    } while (offset <= totalCount)

    return fileUris;
  } catch(e) {
    console.log(e);
    process.exit(1)
  }
}

// Run this only if the Job is Completed
async function downloadFiles() {
  try {
    // const filesApi = apiBuilder.build(SmartlingFilesApi);
    // const filesUris = await getFilesListForJob(projectId, jobId);

    const filesUris = ['app/_data/docs_nav_gateway_2.6.x.yml', 'app/_data/docs_nav_konnect.yml']

    for (const fileUri of filesUris) {
      // const downloadFileParams = new DownloadFileParameters()
        // .setRetrievalType(RetrievalType.PUBLISHED);

      // TODO: any post-processing goes here...
      // config/locales/en.yml => config/locales/ja.yml
      // const downloadedFileContent = await filesApi.downloadFile(projectId, fileUri, locale, downloadFileParams);
      const filePath = path.join(translatedContentPath, locale, fileUri);
      fs.writeFileSync(filePath, 'test');

      // console.log(`Downloaded ${fileUri}`);
    }
  } catch (e) {
    console.log(e);
    process.exit(1)
  }
}

downloadFiles()
