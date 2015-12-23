/// <reference path="../../typings/angularjs/angular.d.ts" />

interface IDestinyService {
  getBungieNetUser(): ng.IPromise<any>
  getMembershipId(platfrom: any, patformUserId: any): ng.IPromise<any>
  getAccountDetails(membershipId: any): ng.IPromise<any>
  getCharacterInventory(membershipId: any, characterId: any): ng.IPromise<any>
  getAccountVault(platform: any, membershipId: any): ng.IPromise<any>
}

export default IDestinyService;