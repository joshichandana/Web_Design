
export function getAllTicketIds() {
   
    let ticketIds = [1,2,3,4,5];

    return ticketIds.map((val) => {
      return {
        params: {
          id: val.toString(),
        },
      };
    });
  }

  export async function getTicketData(id) {
    // const fullPath = path.join(postsDirectory, `${id}.md`);
    // const fileContents = fs.readFileSync(fullPath,'utf8');
    // console.log("Reading file contents ", fileContents);
    // use gray matter to parse the post metadat section
    // const matterResult = JSON.parse(JSON.stringify(matter(fileContents)));
    
   
    let ticketData = {
        id: id,
        name: "Ticket Name for Ticket id " + id,
    }
    // combine the data with the id
    return {
        id,
        ticketData
    }


}