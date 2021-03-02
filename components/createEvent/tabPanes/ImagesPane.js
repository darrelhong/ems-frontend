import { useState } from 'react';
import Image from 'react-bootstrap/Image';
import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { RMIUploader } from "react-multiple-image-uploader";
import { uploadEventImage, uploadMultipleEventImage } from '../../../lib/query/eventApi';

const ImagesPane = ({ register }) => {

    const [profilepicUrl, setProfilepicUrl] = useState(
        '../../../public/assets/images/defaultprofilepic.png'
    );

    const [images,setImages] = useState();

    const dataSources = [
        {
          id: 1,
          dataURL: "https://picsum.photos/seed/1/600",
        },
        {
          id: 2,
          dataURL: "https://picsum.photos/seed/2/600",
        },
        {
          id: 3,
          dataURL: "https://picsum.photos/seed/3/600",
        },
        {
          id: 4,
          dataURL: "https://picsum.photos/seed/4/600",
        },
        {
          id: 5,
          dataURL: "https://picsum.photos/seed/5/600",
        },
        {
          id: 6,
          dataURL: "https://picsum.photos/seed/6/600",
        },
        // {
        //   id: 7,
        //   dataURL: "https://picsum.photos/seed/7/600",
        // },
        // {
        //   id: 8,
        //   dataURL: "https://picsum.photos/seed/8/600",
        // },
        // {
        //   id: 9,
        //   dataURL: "https://picsum.photos/seed/9/600",
        // },
        // {
        //   id: 10,
        //   dataURL: "https://picsum.photos/seed/10/600",
        // },
      ];

    const [visible, setVisible] = useState(false);
    const handleSetVisible = () => {
        console.log('setting visieble');
        setVisible(true);
    };
    const hideModal = () => {
        setVisible(false);
    };
    const onUpload = async (data) => {
        // console.log('checking length');
        // console.log(data.length);
        // console.log('uploading separate');
        // console.log(data[0].file);
        // console.log(data);
        // console.log("Upload files", data);
        
        //single file
        let inputData = new FormData();
        inputData.append('file',data[0].file);
        console.log('checking inpu data');
        console.log(inputData);
        setImages(URL.createObjectURL(data[0].file));
        
        // const response = await uploadEventImage(inputData);

        //multi file upload
        // let fileArray=[];
        // let i;
        // for (i=0;i < data.length; i++) {
        //     fileArray.push(data[i].file);
        // }
        // inputData.append('files',fileArray);
        // const response = await uploadMultipleEventImage(inputData);
    };
    const onSelect = (data) => {
        // console.log("Select files", data);
        console.log('insert into post method');
        console.log(data);
    };
    const onRemove = (id) => {
        console.log("Remove image id", id);
    };

    return (
        <Card className="my-account-content__content">
            <Card.Header>
                <h3>Event Images</h3>
            </Card.Header>
            <Card.Body>
                <div className="account-details-form">
                    {/* <Row>
                        <Col className="form-group" md={12}>
                            <label>Booth Capacity - How many at your event?
              <span className="required">*</span>
                            </label>
                            <input
                                className="form-control"
                                name="boothCapacity"
                                type="number"
                                ref={register({ required: true })}
                            />
                        </Col>
                    </Row> */}

                    <Row>
                        <Col className="form-group" xs={10} md={6}>
                            {/* <Image
                                 className="profile-image"
                                 src={profilepicUrl}
                            
                             /> */}
                            <img src={images}/>
                        </Col>
                    </Row>
                    <Row>
                        <button onClick={() => handleSetVisible()}>Show Me</button>
                        <RMIUploader
                            isOpen={visible}
                            hideModal={hideModal}
                            onSelect={onSelect}
                            onUpload={onUpload}
                            onRemove={onRemove}
                            dataSources={dataSources}
                        />
                    </Row>

                </div>
            </Card.Body>
        </Card>
    );
};

ImagesPane.propTypes = {
    register: PropTypes.func,
};

export default ImagesPane;
