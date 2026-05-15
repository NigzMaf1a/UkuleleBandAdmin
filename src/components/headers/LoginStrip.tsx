//components
import DynamicDiv from "../DynamicDiv";
import DynamicP from "../p/DynamicP";

export default function LoginStrip() {
  return (
    <DynamicDiv className="d-flex flex-column justify-content-center align-items-center login-strip">
        <DynamicP text="The Ukulele Band Admin Web Interface"
                  className="tag"
        />
    </DynamicDiv>
  );
}