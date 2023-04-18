
// function Incidentscontent(props) {
//     var IncidentContent = (
//       <div>
//         <p>Title : {props.title} </p>
//         <p>Description: {props.description} </p>
//         <p>status : {props.status}</p>
//         <p>Priority : {props.priority}</p>
//         <p>Type:</p> { props.type}
//       </div>
//     );
    
//     return IncidentContent;
//   }

//   function Incidents(props) {
//     // var remss = rem.remss;
//     const Inc = [];
//     const [IncList, setIncList] = useState(Inc);
//     const refresh = props.refresh;
  
//     useEffect(() => {
//       fetch("http://localhost:8080/incidents")
//         .then((response) => {
//           if (response.ok) {
//             return response.json();
//           }
//           throw response;
//         })
//         .then((data) => {
//           console.log(data);
//           setIncList(data);
//         });
//     }, [refresh]);
  
//     const items = IncList.map((props) => (
//       <Incidentscontent
//         key={props._id}
        
//         title={props.title}
//         description={props.description}
//         status={props.status}
//         priority={props.priority}
//         type={props.type}
        
//       />
//     ));
//     return <div>{items}</div>;
//   }