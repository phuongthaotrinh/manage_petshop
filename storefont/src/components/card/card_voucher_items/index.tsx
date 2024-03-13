'use client';

import "./coupon.css";
import {Button} from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {InfoCircledIcon} from "@radix-ui/react-icons";

export const CardVoucherItems = ({data}:{data:any}) => {
    return (
        <div className="coupon-item">
            <div className="coupon-item__inner">
                <div className="coupon-item__left">
                    <div className="cp-img">
							<span>
								{data.type === "shipping" && <img className=" ls-is-cached lazyloaded" src="https://theme.hstatic.net/200000592359/1001192084/14/home_coupon_1_img.png?v=47" alt="Miễn phí vận chuyển" />}
                                {data.type === "voucher" && <img className=" ls-is-cached lazyloaded"  src="https://theme.hstatic.net/200000592359/1001192084/14/home_coupon_2_img.png?v=47" alt="Miễn phí vận chuyển" />}
                                {data.type === "gift" && <img className=" ls-is-cached lazyloaded" src="https://theme.hstatic.net/200000592359/1001192084/14/home_coupon_3_img.png?v=47" alt="Miễn phí vận chuyển" />}
                            </span>
                    </div>
                </div>
                <div className="coupon-item__right cp-icon">
                    <button type="button" className="cp-icon is-active" data-bs-toggle="popover" data-bs-container="body" data-bs-placement="bottom" data-content-id="cp-tooltip-1" data-class="coupon-popover" data-bs-title="Miễn phí vận chuyển" aria-label="coupon-tooltip-1" data-bs-original-title="" title="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" x="0" y="0" viewBox="0 0 24 24"><g><g fill="rgb(0,0,0)"><path clipRule="evenodd" d="m12 3.53846c-4.67318 0-8.46154 3.78836-8.46154 8.46154 0 4.6732 3.78836 8.4615 8.46154 8.4615 4.6732 0 8.4615-3.7883 8.4615-8.4615 0-4.67318-3.7883-8.46154-8.4615-8.46154zm-10 8.46154c0-5.52285 4.47715-10 10-10 5.5228 0 10 4.47715 10 10 0 5.5228-4.4772 10-10 10-5.52285 0-10-4.4772-10-10z"></path><path clip-rule="evenodd" d="m12 7.64103c.4248 0 .7692.34439.7692.76923v4.10254c0 .4249-.3444.7693-.7692.7693s-.7692-.3444-.7692-.7693v-4.10254c0-.42484.3444-.76923.7692-.76923z"></path><path d="m13.0256 15.5897c0 .5665-.4592 1.0257-1.0256 1.0257s-1.0256-.4592-1.0256-1.0257c0-.5664.4592-1.0256 1.0256-1.0256s1.0256.4592 1.0256 1.0256z"></path></g></g></svg>
                    </button>
                    
                    <div className="cp-top">
                        <h3>{data.title}</h3>
                        <p>{data.subtitle}</p>
                    </div>
                    <div className="cp-bottom">
                        <div className="cp-bottom-detail">
                            <p>Mã: <strong>{data.code}</strong></p>
                            <p>HSD: {data.ends_at}</p>
                        </div>
                        <div className="cp-bottom-btn">
                            <Button size="small">Sao chép mã</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

















