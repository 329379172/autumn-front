/**
 * Created by linfeiyang on 16-6-30.
 */
import {Component} from "@angular/core";
import {TestService} from './service/test.service';
import moment = require("moment/moment");


interface FinanceResponse{
  code: number,
  data: FinanceList,
  message: string,
  systemTime: number
}

interface FinanceList {
  borrowList: Array<Borrow>,
  borrowMoney: Array<Borrow>,
  carouselsList: Array<any>,
  debtList: Array<any>,
  fundPlanList: Array<FundPlan>,
  selectedList: Array<any>
}


interface Borrow{
  annualRate: string,
  auditStatus: number,
  borrowAmount: string,
  borrowShow: number,
  borrowStatus: number,
  borrowTitle: string,
  borrowWay: number,
  credit: number,
  creditrating: number,
  currentTime: string,
  dayDeadline: number,
  deadline: number,
  excitationSum: string,
  excitationType: number,
  guaranteeType: number,
  hasPWD: number,
  id: number,
  imgPath: string,
  investNum: number,
  isDayThe: number
  isFinancePlan: number
  isUniteRatehike: number,
  purpose: number,
  rateHikeRate: number,
  schedules: number,
  stateOwnedGuaratee: number,
  tags: Array<Object>,
  upcomingTime: number,
  username: string,
  vip: number,
  vipStatus: number
}

interface FundPlan {
  accumulateEarnings: number,
  autoBidCount: number,
  averageEarningsRate: number,
  capitalUtilizationRate: number,
  closeTime: string,
  debtType: string,
  earlyQuitFeeRate: number,
  earningsDisposal: string,
  exceptedRate: number,
  feedDate: string,
  hasSendQuitMsg: number,
  id: number,
  interestProType: number,
  interestReInvest: number,
  investUnit: number,
  isCanEarlyQuit: number,
  isRed: number,
  isUniteRatehike: number,
  joinCount: number,
  joinFeeRate: number,
  leftAmount: number,
  lockDays: number,
  lockMonth: number,
  lockTime: string,
  maxAmountPerInvestor: number,
  maxExceptedRate: number,
  maxPercentPerDebt: number,
  minAmountPerInvestor: number,
  minExceptedRate: number,
  newOnly: number,
  openTime: string,
  planAmount: number,
  planNo: number,
  planOpenTime: string,
  planStatus: number,
  planTitle: string,
  planType: string,
  principalProType: number,
  quitFeeRate: number,
  rateHikeRate: number,
  remainTime: string,
  remainTimeStamp: number,
  safeType: number,
  saleRate: number,
  saleTime: string,
  schedule: string,
  serviceFeeRate: number,
  soldOutTime: string,
  storageAmount: number,
  tags: Array<any>
  type: number,
  valueDate: string
}

@Component({
  selector: 'app',
  template: `
    <h1>test</h1>
    <table class="table table-striped">
    
      <theader *ngIf="fundPlanList!= null && fundPlanList.length > 0">
        <th colspan="2">龙聚宝</th>
      </theader>
      
      <tr *ngFor="let item of fundPlanList">
          <td>{{item.planTitle}}</td>
          <td>{{item.saleTime}}</td>
      </tr>
    </table>
    <table class="table table-striped">
      <theader *ngIf="borrowList!= null && borrowList.length > 0">
        <th colspan="2">散标</th>
      </theader>
      
      <tr *ngFor="let item of borrowList">
          <td>{{item.username}}</td>
          <td>{{item.currentTime}}</td>
      </tr>
    </table>
  `,
  providers: [TestService]
})
export class Test{
  data : FinanceList;
  total: number;
  borrowList: Array<Borrow>;
  fundPlanList: Array<FundPlan>;
  constructor(testService: TestService){
    this.data = <FinanceList>{};
    this.total = 0;
    this.borrowList = [];
    this.fundPlanList = [];
    if(this.data.borrowList){
      return;
    }
    testService.getData((err: Error, data: FinanceResponse) => {
      if(err){
        alert("获取数据失败")
      } else {
        console.log(data);
        this.data = data.data;
        this.borrowList = this.data.borrowList || [];
        console.log(this.borrowList);
        this.fundPlanList = this.data.fundPlanList || [];
        this.borrowList.forEach((item: Borrow) => {
          var timeNumber: number = parseInt(item.currentTime, 0);
          item.currentTime = new moment(timeNumber).format('YYYY-MM-DD HH:mm:ss');
        });
      }
    });
  }
}
