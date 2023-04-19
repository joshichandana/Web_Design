
export function getAllIncidentIds() {
   
    let IncidentIds = [1,2,3,4,5];

    return IncidentIds.map((val) => {
      return {
        params: {
          id: val.toString(),
        },
      };
    });
  }

  export async function getIncidentData(id) {
    // const fullPath = path.join(postsDirectory, `${id}.md`);
    // const fileContents = fs.readFileSync(fullPath,'utf8');
    // console.log("Reading file contents ", fileContents);
    // use gray matter to parse the post metadat section
    // const matterResult = JSON.parse(JSON.stringify(matter(fileContents)));
    
   
    let IncidentData = {
        id: id,
        name: "Incident Name for Incident id " + id,
    }
    // combine the data with the id
    return {
        id,
        IncidentData
    }


}