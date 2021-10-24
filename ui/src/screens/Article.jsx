import { useEffect } from 'react';
import {useParams} from 'react-router-dom';
import NavBar from '../components/NavBar';
import Preview from './Write/Preview';

// useEffect( () => {
//     return (

//     );
// }, [])
const loadedData = {
    readTime: "5 min",
    authorLink: "https://drckangelo.medium.com/?source=post_page-----8f2258f81899--------------------------------",
    title: "What Happened To Clubhouse?",
    summary: "Easy come easy go.",
    contentType : [
    "image", "para", "para", "para", "para", "para", "para", "para", "para", "heading", "image",
    ],
    content: [
    "https://miro.medium.com/max/1500/1*LUhwsbqn7FXfHVWhekLy0g.png",
    "It was April of 2020, amidst the COVID-19 pandemic where everybody was at home, quarantining. Suddenly, there was noise around a new social networking platform called ‘Clubhouse’.",
    "A lot of people were talking about it on Twitter which includes a lot of hype around this so-called “the new normal social app”. This is what brings Clubhouse to my attention.",
    "I turned on my Twitter and stumbled upon some tweets that were talking about it. It was a great discovery. Its exclusivity is what makes the platform more desired by people.",
    "To get in, you needed an invite, from someone to let you in. Kinda like the frat party that we’ve all attended back in college. This strategy is what brought hundreds of thousands and now millions of users to the platform.",
    "Conversation rooms come and go as people launch or end them.",
    "The company claims that over 500,000 rooms are created per day on average. The platform also claims that it records conversations as they happen but only keeps them on record if someone files a complaint while the room is live.",
    "If no one files a complaint, Clubhouse says it deletes the recording as soon as the host closes the discussion.",
    "Clubhouse kept its exclusivity vibe even long after they updated their platform to be available without an invite.",
    "The cool fact? It was only available for iPhones.",
    "https://miro.medium.com/max/1050/0*LY6MXofFTTOizARf.jpg",
    ],
    tag: ["Technology", "Startup", "Business", "Innovation", "Mindfullness"],
};
export default function Article(){
    const {articleId} = useParams();
 
    return(
        <>
        <NavBar />
        Article {articleId}
        <Preview data={loadedData} />
        </>
    );
}