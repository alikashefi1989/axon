import { BsBatteryHalf, BsReception4, BsWifi } from "react-icons/bs";

interface LayoutProps {
    renderProps: () => JSX.Element
}

const Layout = (props: LayoutProps): JSX.Element => {
    return <div className="main-layout">
        <div className="phone-view">
            <div className="phone-top">
                <div className="speaker">
                    <div className="camera"></div>
                </div>
            </div>
            <div className="inner-view">
                <div className="clock text-white font-size-12">15:36</div>
                <div className="cell-battry-info px-1">
                    <div className="left">
                        <BsReception4 className="text-white font-size-12" />
                        <span className="text-white mx-1 font-size-12">Irancell</span>
                        <BsWifi className="text-white font-size-12" />
                    </div>
                    <div className="right">
                        <span className="text-white mx-1 font-size-12">56%</span>
                        <BsBatteryHalf className="text-white font-size-12" />
                    </div>
                </div>
                {props.renderProps()}
            </div>
            <div className="phone-bottom">
                <div className="home-button"></div>
            </div>
        </div>
    </div>
}

export default Layout