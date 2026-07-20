//components
import GlobalModal from "./GlobalModal";
import DynamicDiv from "../DynamicDiv";
import DynamicButton from "../buttons/DynamicButton";
import LabelledDynamicP from "../p/LabelledDynamicP";

//interfaces
import type User from "../../interfaces/user";
import RoundedImage from "../images/RoundedImage";

interface DetailProps {
    callback1: () => void;
    user: User;
}

export default function UserDetailCard({ callback1, user }: DetailProps) {
    return (
        <GlobalModal>
            <DynamicDiv className="align-items-center d-flex detail-body flex-column gap-3 justify-content-center">
                <DynamicDiv className="detail-image">
                    <RoundedImage src={user.photo as string || '/nzaumi.jpg'} />
                </DynamicDiv>

                <DynamicDiv className="align-items-center d-flex flex-column gap-1 justify-content-center">
                    <LabelledDynamicP label="Name:"
                        text={user.name}
                        classNameDiv="detail-item-div"
                    />

                    <LabelledDynamicP label="Phone No:"
                        text={String(user.phoneno)}
                        classNameDiv="detail-item-div"
                    />

                    <LabelledDynamicP label="Email:"
                        text={user.email}
                        classNameDiv="detail-item-div"
                    />

                    <LabelledDynamicP label="Gender:"
                        text={user.gender}
                        classNameDiv="detail-item-div"
                    />

                    <LabelledDynamicP label="Reg Type:"
                        text={user.regtype}
                        classNameDiv="detail-item-div"
                    />

                    <LabelledDynamicP label="Location:"
                        text={user.dlocation}
                        classNameDiv="detail-item-div"
                    />

                    <LabelledDynamicP label="Acc Status:"
                        text={user.accstatus}
                        classNameDiv="detail-item-div"
                        classNameText={`${user.accstatus === 'Pending' ? 'goldenrod' : user.accstatus === 'Approved' ? 'green' : 'red'} `}
                    />
                </DynamicDiv>

                <DynamicButton label="Close" onClick={callback1} className="user-detail-close-btn" />
            </DynamicDiv>
        </GlobalModal>
    );
}