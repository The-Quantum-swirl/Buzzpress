import Preview from "./Preview";
import api from "../../service/ServiceCall";

export default function FinalPreview(props) {
    // preparing data for image list before previewing it
    var content = props.data.content;
    var contentType = props.data.contentType;
    var imglist= [];

    content.map( (element, index) => {
        if (contentType[index] === 'image'){
            // content[index] is image name
            imglist.push( api.getThumbUrl(element) )
        }
    })
    console.log(imglist);
    props.data.imagelist = imglist;
    // preparing data ends
    
    return(
        
        <Preview data={props.data} />
        
    );

}