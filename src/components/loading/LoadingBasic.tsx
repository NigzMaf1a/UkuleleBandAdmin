//components
import GlobalModal from '../modals/GlobalModal';
import DynamicDiv from '../DynamicDiv';
import DynamicP from '../p/DynamicP';

export default function LoadingBasic() {
  return (
    <GlobalModal>
        <DynamicDiv className="bg-light my-4 text-center"
                    style={{width:'100px', height:'100px'}}
        >
          <DynamicP text={"Loading..."}/>
        </DynamicDiv>
    </GlobalModal>
  );
}
