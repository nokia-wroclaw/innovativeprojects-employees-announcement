import React, { Component } from 'react';
import Announcement from './Announcement';

class AnnouncementList extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                {AnnouncementList.map(Announcement => (
                    <Announcement
                    
                ))}


            </div>



         );
    }
}
 
export default AnnouncementList;