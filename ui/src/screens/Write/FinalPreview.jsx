import Preview from "./Preview";

export default function FinalPreview(props) {
    // preparing data for image list before previewing it
    var content = props.data.content;
    var contentType = props.data.contentType;
    var imglist= [];

    content.forEach( (element, index) => {
        if (contentType[index] === 'image'){
            imglist.push(element)
        }
    });
    props.data.imagelist = imglist;
    // preparing data ends
    
    return(
        <Preview data={props.data} />
    );

}