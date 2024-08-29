// import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import io from 'socket.io-client';
// import { toast } from 'react-toastify';

// const socket = io('http://localhost:3000');

// export default function ReportAbuseModal({ isOpen, onClose, reportedUserId }) {
//     const [reportReason, setReportReason] = useState('');
//     const { currentUser } = useSelector(state => state.user);

//     const handleReportAbuse = async () => {
//         if (!reportReason.trim()) {
//             toast.error("Please provide a reason for reporting abuse.");
//             return;
//         }

//         try {
//           console.log(reportedUserId)  
//             const response = await axios.post('/api/user/reportAbuse', {
//                 reporterId:currentUser._id,
//                 reportedUserId,
//                 reason: reportReason
//             });

//             if (response.status === 200) {
                
//                 toast.success("Abuse report submitted successfully.");
//                 console.log(reportedUserId+ "   " + reason)
//                 socket.emit('reportAbuse', {
//                       reporterId: currentUser._id,
//                       reportedUserId: reportedUserId,
//                       reason: reportReason
//                   });
//                 onClose();
//                 setReportReason('');
//             }
//         } catch (error) {
//             console.error('Error reporting abuse:', error);
//             toast.error("Failed to submit abuse report.");
//         }
//     };

//     return (
//         <div className={`report-abuse-modal ${isOpen ? 'd-block' : 'd-none'}`}>
//             <div className="report-abuse-modal-content">
//                 <span className="report-abuse-close" onClick={onClose}>&times;</span>
//                 <h2>Report Abuse</h2>
//                 <textarea
//                     placeholder="Enter reason for reporting abuse..."
//                     value={reportReason}
//                     onChange={(e) => setReportReason(e.target.value)}
//                 ></textarea>
//                 <button onClick={handleReportAbuse} className="btns" >Submit</button>
//             </div>
//         </div>
//     );
// }

import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import io from 'socket.io-client';
import { toast } from 'react-toastify';
import { AttachFile } from '@mui/icons-material';

const socket = io('http://localhost:3000');

export default function ReportAbuseModal({ isOpen, onClose, reportedUserId }) {
    const [reportReason, setReportReason] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [attachmentURL,setAttachmentURL] = useState(null);
    const { currentUser } = useSelector(state => state.user);
    
    const handleFileChange = (e) => {
        setAttachment(e.target.files[0]);
        const file = e.target.files[0];
        if (file) {
        //   setImageFile(file);
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            setAttachmentURL(reader.result);
          };
        }
    };

    const handleReportAbuse = async () => {
        if (!reportReason.trim()) {
            toast.error("Please provide a reason for reporting abuse.");
            return;
        }

        try {
           
            // const response = await axios.post('/api/user/reportAbuse', {
            //     reporterId: currentUser._id,
            //     reportedUserId,
            //     // proofImage:attachmentURL,
            //     reason: reportReason
            // });
            alert("sds")
            const formData = new FormData();
            formData.append('reporterId', currentUser._id);
            formData.append('reportedUserId', reportedUserId);
            formData.append('reason', reportReason);
            const response = await fetch(`/api/user/reportAbuse`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({reporterId:currentUser._id,reportedUserId,reason:reportReason,proofImage:attachmentURL}),
              });
            if (response.status === 200) {
                toast.success("Abuse report submitted successfully.");
                // socket.emit('reportAbuse', {
                //     reporterId: currentUser._id,
                //     reportedUserId: reportedUserId,
                //     reason: reportReason
                // });
                console.log('Emitting reportAbuse event');
                socket.emit('reportAbuse', {
                    reporterId: currentUser._id,
                    reportedUserId,
                    reason: reportReason
                }, (acknowledgment) => {
                    if (acknowledgment && acknowledgment.status === 'success') {
                        console.log('Socket emitted successfully:', acknowledgment.message);
                    } else {
                        console.error('Socket emission failed');
                    }
                });
                onClose();
                setReportReason('');
            }
        } catch (error) {
            console.error('Error reporting abuse:', error);
            toast.error("Failed to submit abuse report.");
        }
    };

    return (
        <div className={`report-abuse-modal ${isOpen ? 'd-block' : 'd-none'}`}>
            <div className="report-abuse-modal-content">
                <span className="report-abuse-close" onClick={onClose}>&times;</span>
                <h2>Report Abuse</h2>
                <textarea
                    placeholder="Enter reason for reporting abuse..."
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                ></textarea>
                  <input 
                        type="file" 
                        id="file-input" 
                        onChange={handleFileChange} 
                        accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" 
                        style={{ display: 'none' }} 
                    />
                    <label htmlFor="file-input" className="attach-label">
                        <AttachFile className="attach-icon" /> 
                        {attachment ? attachment.name : 'Attach file'}
                    </label>
                    <div className="report-abuse-modal-footer">
                        <button onClick={handleReportAbuse} className="btns">Submit</button>
                    </div>
               
            </div>
        </div>
    );
}
