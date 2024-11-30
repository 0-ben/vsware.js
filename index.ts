/**
 * Copyright 2024 https://github.com/0-ben
 * Licensed under Academic Free License ("AFL") v3.0
 */

import makeFetchCookie, { FetchCookieImpl } from 'fetch-cookie'
import { CookieJar }from 'tough-cookie'

type nullable<T> = T | null
type NumberOrString = string | number

export interface LoginResult {
    username: string,
    accountMainUserRole: string,
    displayname: string,
    firstName: string,
    lastName: string,
    nextStep: string,
    wizardSteps: nullable<any> // haven't seen anything other than else
}

export interface LocaleType {
    country: string,
    language: string,
    locale: string,
}

export interface SecurityRoleResult {
    username: string,
    firstName: string,
    lastName: string,
    displayName: string,
    email: nullable<string>,
    teachingPost: nullable<string>,
    roles: string[],
    academicYearId: number,
    academicYearCode: string,
    userInfoId: number,
    facultyId: nullable<number>,
    learnerId: nullable<number>,
    locale: LocaleType,
    schoolName: string,
    schoolPhoneNumber: string,
    tenant: number,
    subdomain: string,
    mainRole: string,
    createdAt: string,
    nameLayout: number,
}

export interface IndividualLearner {
    userInfoId: number,
    learnerId: number,
    preferredGivenName: string,
    displayName: string,
    photo: string,
    givenName: string,
    familyName: string,
}

export type LearnersResult = IndividualLearner[]

export interface UnreadCountResult {
    unreadMailCount: nullable<number>,
    unreadSmsCount: nullable<number>,
    lastReceivedMail: nullable<any>,
    lastReceivedSms: nullable<any>,
}

export interface ParentalDetailsResult {
    address: {
      addressLine1: nullable<string>,
      addressLine2: nullable<string>,
      addressLine3: nullable<string>,
      addressLine4: nullable<string>,
      county: nullable<string>,
      country: nullable<string>,
      postCode: nullable<string>
    },
    mobilePhone: string,
    email: string
}

export interface IndividualAcademicYear {
    id: number,
    version: number,
    code: string,
    name: string,
    currentYear: boolean,
    year: number,
    terms: {
        id: number,
        version: number,
        startDate: string,
        endDate: string,
        code: string,
        name: string,
    }[],
    indentifier: number,
}

export type AcademicYearsResult = IndividualAcademicYear[]

export interface AllAcademicYearsResult {
    status: number,
    payload: (IndividualAcademicYear & {
        minStartDate: string,
        maxEndDate: string,
    })[],
    errors: nullable<any>,
    errorMessage: nullable<any>,
}

export interface PersonalInfoResult {
    firstName: string,
    lastName: string,
    birthCertName: string,
    preferredFirstName: string,
    mothersMaidenName: string,
    ppsNumber: string,
    birthDate: string,
    countryOfBirth: nullable<string>,
    nationality: string,
    gender: string,
    email: nullable<string>,
    mobileNumber: nullable<string>,
}

export interface SchoolInfoResult {
    courseTypeShortName: string,
    classGroupName: string,
    learnerSchoolEnrolment: {
        startDate: string,
        endDate: nullable<string>,
        leftEarly: boolean,
    },
    departmentPupilId: number,
    previousSchool: {
        name: string,
        id: string,
        schoolType: nullable<string>
    },
    examEntrant: string,
    examRepeat: nullable<any>,
    repeatDetails: nullable<any>,
    otherMisId: nullable<any>,
    lockerNumber: nullable<any>,
    school5DayBoardingFee: nullable<any>,
    school7DayBoardingFee: nullable<any>,
    isBoardingSchoolStudent: nullable<boolean>,
    examNumber: nullable<any>,

}

export interface AttendanceRecordOverviewResult {
    totalSchoolDays: number,
    lateAbsences: any[], // test data had no absences, ever! (such a good student)
    unexplainedAbsences: any[], // test data had no absences, ever! (such a good student)
    /**
     * @description In the format YYYY-MM-DD
     */
    presentDays: string[],
    /**
     * @description In the format YYYY-MM-DD (citation needed)
     */
    absentDays: string[],
    
    /**
     * @description In the format YYYY-MM-DD (citation needed)
     */
    partiallyAbsentDays: string[],
    todayPartialUnexplainedAbsences: {
        maxStartTime: nullable<any>,
        minEndTime: nullable<any>,
        todayUnexplainedBellTimeAbsences: any[]
    }
}

export interface IndividualAttendanceCode {
    id: number,
    code: string,
    shortDescription: string,
    statutoryCode: string,
    type: string,
    availableToParents: boolean,
    availableToTeachers: 'Yes' | 'No', // I hate this. I hate this so much. Why is it a yes/no and not a boolean??
    deleted: boolean,
}

export interface WorkforceTeacher {
    workforcePersonalId: nullable<number>,
    teacherName: string,
}

export interface IndividualTimetableItem {
    /**
     * @description Hex code, e.g. AABBCC
     */
    color: string,
    subject: string,
    roomName: string,
    timetablePeriodId: number,
    /**
     * @description e.g. 2024-1-1 09:00:00
     */
    startTime: string,
    /**
     * @description e.g. 2024-1-1 09:00:00
     */
    endTime: string,
    teacher: WorkforceTeacher,
    teachingGroupId: number,
    additionalTeachers: WorkforceTeacher[],
}

export interface TimetableDownloadInfoResult {
    status: number,
    payload: {
        downloadId: string,
    },
    errors: nullable<any>,
    errorMessage: nullable<any>
}

export interface TimetableDownloadErrorResult {
    status: string,
    message: string,
}

export interface AssessmentInfo {
    id: number,
    tenant: number,
    academicYearId: number,
    name: string,
    description: nullable<string>,
    courseId: nullable<any>,
    yearId: nullable<any>,
    /**
     * @description In the format 2024-12-31T00:00:00
     */
    startDate: string,
    /**
     * @description In the format 2024-12-31T00:00:00
     */
    endDate: string,
    assessmentType: string,
    /**
     * @description In the format 2024-12-31
     */
    assessmentStart: string,
    /**
     * @description In the format 2024-12-31
     */
    assessmentEnd: string,
    parentalPrintTemplateId: nullable<any>,
    capturePrincipalComment: boolean,
    captureTutorComment: boolean,
    captureYearHeadComment: boolean,
    captureHouseMasterComment: boolean,
    publish: boolean
}

export interface TeacherAssessmentComment {
    captureTarget: boolean,
    extraFieldDetailsDTOList: any[],
    Id: number,
    LearnerPersonalId: number,
    AssessmentId: number,
    AssessmentName: string,
    /**
     * @description In the format 2024-12-31
     */
    AssessmentStartDate: string,
    /**
     * @description In the format 2024-12-31
     */
    AssessmentEndDate: string,
    Subject: string,
    /**
     * @description Hex code, e.g. AABBCC
     */
    SubjectColour: string,
    SubjectCode: number,
    TeacherName: string,
    TeacherRemark: string,
    TeacherComment: string,
    TeacherCommentBank: nullable<any> // idk
    TeachingGroupName: string,
    TeacherDisplayCode: string,
    TeachingGroupId: number,
    CourseId: string,
    StudyLevel: string,
    Grade: nullable<string>,
    NewGrade: nullable<string>,
    Mark: nullable<string>,
    TargetMark: nullable<string>,
    TargetGrade: nullable<string>,
    NewCAOPoints: nullable<number>,
    OldCAOPoints: nullable<number>,
    GradeType: string,
    AssessmentCommentType: 'FREE_FORM' | {} & string
    ExtraField1?: string,
    ExtraField2?: string,
    ExtraField3?: string,
    ExtraField4?: string,
    ExtraField5?: string,
    ExtraField6?: string,
    ExtraField7?: string,
    ExtraField8?: string,
    ExtraField9?: string,
    ExtraField10?: string,
    ExtraField11?: string,
    ExtraField12?: string
}

export interface OverviewComment {
    id: nullable<number>,
    workforcePersonalId: number,
    comment: string,
    commenterType: 'PRINCIPAL' | 'HOUSE_MASTER' | 'YEAR_HEAD' | 'TUTOR',
    commenterName: string,
}

export interface BasicBehaviourResult {
    startingPoints: number
}

export interface FullBehaviourResult {
    status: number,
    payload: {
        displayName: string
        id: number,
        photoId: string,
        photoURL: nullable<string>,
        givenName: string,
        familyName: string,
        preferredGivenName: string,
        status: number,
        location: nullable<string>,
        hasAccessToViewAssessments: boolean,
        collection: {
            behaviourEntry: {
                id: number,
                version: number,
                positiveOrNegative: string,
                behaviourPoints: number,
                behaviourIcon: string,
                behaviourDescription: nullable<string>
                behaviourName: string
            },
            learnerId: number,
            /**
             * @description In the format 10 Oct 2024 12:34:56
             */
            editedDate: string,
            /**
             * @description In the format 10 Oct 2024 12:34:56
             */
            createdDate: string,
            behaviourNote: string,
            editorName: string,
            creatorName: string,
            creatorUserInfoId: number,
            learnerName: string,
            total: number,
            actionTakenNote: nullable<any>
            teachingGroupId: number,
            teachingGroupName: string,
            subjectName: number,
            /**
             * @description Appears to be a rounded to the second millisecond since epoch
             */
            incidentDate: number,
            /**
             * @description In the format 10 Oct 2024 12:34:56. Is equivalent to the incidentDate
             */
            incidentDateStr: string,
            givenName: string,
            familyName: string,
            preferredGivenName: nullable<string>,
            escalationEdit: nullable<any>
            assigneeUserInfoId: number,
            privacy: boolean,
            closed: boolean,
            editable: boolean,
            escalationVisibility: boolean,
            id: boolean,
            version: number,
            personal: boolean,
            pointsIncluded: boolean,
            actors: any[],
            escalationEdited: boolean,
        }[],
        fields: any,
        startingPoints: number,
        totalPoints: number,
        behaviourScore: number,
        positivePoints: number,
        negativePoints: number,
        chart: {
            [key: string]: number,
        },
        memberships: {
            subjectName: string,
            teacherName: string,
            teacherId: number,
            teachingGroupName: string,
            teachingGroupId: number,
            studyLevelEnum: nullable<any>,
            studyLevel: nullable<any>,
            membershipId: nullable<number>,
            learnerPersonalId: nullable<number>,
            subjectId: nullable<number>,
            yearlyRequiredMinutes: nullable<number>,
        }[]
    },
    errors: nullable<any>,
    errorMessage: nullable<any>,
}

export interface NotificationResult {
    id: string,
    notificationType: 'ASSESSMENT' | {} & string, // predefined for iDE, but no typeerror if not
    retentionPolicy: 'NONE' | {} & string, // predefined for iDE, but no typeerror if not
    retentionPolicyFrom: nullable<any>,
    retentionPolicyUntil: nullable<any>,
    /**
     * @description YYYY-MM-DD HH:MM:SS
     */
    createdOn: string,
    messageTopic: string,
    relatedItemId: string,
    /**
     * @description Stringified JSON
     */
    additionalInfo: string,
    tenantId: number,
    senderUserId: number,
    senderName: string,
    senderUserName: string,
    active: boolean,
    broadcastState: 'COMPLETE' | {} & string, // predefined for iDE, but no typeerror if not
    broadcastTypes: {
        broadcastType: 'PUSH' | {} & string,
    }[],
    receiverUserIds: {
        receiverUserId: number,
        acknowledgementStatus: 'NEW' | {} & string,
        acknowledgementDate: nullable<any>,
        broadcastResults: any[],
        notificationReceiverIdentity: {
            receiverUserId: number,
        },  
    }[],
    relatedItem: nullable<any>,
}

export class VSWare {
    private jar = new CookieJar()
    private fetcher = makeFetchCookie(fetch, this.jar)
    private headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0'
    }

    private controlBaseURL: string;
    private appBaseURL: string;

    private username: string | undefined;
    private password: string | undefined;
    private bearer: string | undefined;

    constructor(private subdomain: string) {
        this.controlBaseURL = `https://${subdomain}.vsware.ie`
        this.appBaseURL = `https://${subdomain}.app.vsware.ie`
    }

    async setup() {
        await this.fetcher(this.controlBaseURL + '/control/tenant')
    }

    async login(username: string, password: string): Promise<LoginResult> {
        this.username = username
        this.password = password

        const resp = await this.fetcher(`${this.controlBaseURL}/tokenapiV2/login`, {
            method: 'POST',
            body: JSON.stringify({
                "username": this.username,
                "password": this.password,
                "source": "web"
            }),
            headers: this.headers,
        })
        this.bearer = resp.headers.get('Authorization')!
        return await resp.json() as LoginResult 
    }

    async getLocale(): Promise<LocaleType> {
        const resp = await this.fetcher(`${this.controlBaseURL}/control/localisation/locale/current/`, {
            method: 'GET',
            headers: this.headers,
        })
        return await resp.json() as LocaleType
    }
    
    async getSecurityRoles(): Promise<SecurityRoleResult> {
        const resp = await this.fetcher(`${this.controlBaseURL}/control/securityroles/user/`, {
            method: 'GET',
            headers: this.headers,
        })
        return await resp.json() as SecurityRoleResult
    }

    async getLearners(): Promise<LearnersResult> {
        const resp = await this.fetcher(`${this.controlBaseURL}/control/household/learners/`, {
            method: 'GET',
            headers: this.headers,
        })
        return await resp.json() as LearnersResult
    } 
    
    async getUnreadCount(): Promise<UnreadCountResult> {
        const resp = await this.fetcher(`${this.controlBaseURL}/control/comms/threads/unread-count/`, {
            method: 'GET',
            headers: this.headers,
        })
        return await resp.json() as UnreadCountResult
    }
    
    async getUnreadNotifications(): Promise<NotificationResult[]> {
        const resp = await this.fetcher(`${this.controlBaseURL}/control/notification?acknowledgementStatuses=NEW`, {
            method: 'GET',
            headers: this.headers,
        })
        return await resp.json() as NotificationResult[]
    }
    
    async getParentalDetails(): Promise<ParentalDetailsResult> {
        const resp = await this.fetcher(`${this.controlBaseURL}/control/parental/details`, {
            method: 'GET',
            headers: this.headers,
        })
        return await resp.json() as ParentalDetailsResult
    }

    async getAcademicYears(learnerId: NumberOrString): Promise<AcademicYearsResult> {
        const resp = await this.fetcher(`${this.controlBaseURL}/control/learners/${learnerId}/academic-years`, {
            method: 'GET',
            headers: this.headers,
        })
        return await resp.json() as AcademicYearsResult
    }
    
    async getAllAcademicYears(): Promise<AllAcademicYearsResult> {
        const resp = await this.fetcher(`${this.controlBaseURL}/control/calendar/academicyear/fetch`, {
            method: 'GET',
            headers: this.headers,
        })
        return await resp.json() as AllAcademicYearsResult
    }
    
    async getPersonalInfo(learnerId: NumberOrString): Promise<PersonalInfoResult> {
        const resp = await this.fetcher(`${this.controlBaseURL}/control/parental/${learnerId}/personal-info`, {
            method: 'GET',
            headers: this.headers,
        })
        return await resp.json() as PersonalInfoResult
    }
    
    async getSchoolInfo(learnerId: NumberOrString): Promise<SchoolInfoResult> {
        const resp = await this.fetcher(`${this.controlBaseURL}/control/parental/${learnerId}/school-info`, {
            method: 'GET',
            headers: this.headers,
        })
        return await resp.json() as SchoolInfoResult
    }

    async getAttendanceRecordOverview(learnerId: NumberOrString, yearId: NumberOrString): Promise<AttendanceRecordOverviewResult> {
        const resp = await this.fetcher(`${this.controlBaseURL}/control/parental/${learnerId}/attendance/${yearId}/overview`, {
            method: 'GET',
            headers: this.headers,
        })
        return await resp.json() as AttendanceRecordOverviewResult
    }

    // TODO: /control/parental/attendance-requests/[year]/[?????]/all
    // TODO: /control/parental/[learner]/attendance/[year]/lessons

    async getAttendanceCodes(type?: 'all' | '' | undefined): Promise<IndividualAttendanceCode[]> {
        const resp = await this.fetcher(`${this.controlBaseURL}/control/parental/attendance-codes${type == 'all' ? '/all' : ''}`, {
            method: 'GET',
            headers: this.headers,
        })
        return await resp.json() as IndividualAttendanceCode[]
    }

    static _formatDateForTimetable(date: Date): string {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }

    async getTimetable(learnerId: NumberOrString, start: Date | string, end: Date | string): Promise<IndividualTimetableItem[]> {
        if (typeof start != 'string') start = VSWare._formatDateForTimetable(start)
        if (typeof end != 'string') end = VSWare._formatDateForTimetable(end)

        const resp = await this.fetcher(`${this.controlBaseURL}/control/parental/${learnerId}/timetable?startDate=${start}&endDate=${end}`, {
            method: 'GET',
            headers: this.headers,
        })
        return await resp.json() as IndividualTimetableItem[]
    }

    async getPrintableTimetable(learnerId: NumberOrString[] | NumberOrString, 
        width: number, 
        height: number, 
        showSubjectColour: boolean = false,
        extraCSSClasses: string = '',
        isMaster: boolean = false,
    ): Promise<TimetableDownloadInfoResult | TimetableDownloadErrorResult> {
        const resp = await this.fetcher(`${this.controlBaseURL}/control/timetable/print/`, {
            method: 'POST',
            headers: {
                ...this.headers,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                timetableData: {
                    type: 'PUBLISHED', // ???
                    students: typeof learnerId == 'object' ? learnerId : [ learnerId ], // if it's array, give array, otherwise make array.
                },
                height: height,
                tableHeight: height,
                width: width,
                tableWidth: width,
                showSubjectColour: showSubjectColour,
                extraCssClasses: extraCSSClasses,
                isMaster: isMaster,
            })
        })
        return await resp.json() as TimetableDownloadInfoResult | TimetableDownloadErrorResult
    }

    /**
     * 
     * @returns {string} A HTML document.
     */
    async printTimetable(downloadId: string): Promise<string> {
        const resp = await this.fetcher(`${this.controlBaseURL}/control/converter/open/${downloadId}`, {
            method: 'GET',
            headers: this.headers,
        })
        return await resp.text() as string
    }

    getTenantForLearner(learner: IndividualLearner): string {
        return learner.photo.split('/')[3]
    }

    async renewAccessToken(): Promise<void> {
        await this.fetcher(`${this.controlBaseURL}/control/user/renew-access-token`, {
            method: 'POST',
            headers: this.headers,
            body: 'null'
        })
    }

    async getAssessments(learnerId: NumberOrString, tenant: NumberOrString): Promise<AssessmentInfo[]> {
        const url = `https://api-gateway.vsware.ie/assessment-service/control/assessment/${tenant}/term/learner/${learnerId}?published=true`
        const resp = await this.fetcher(url, {
            method: 'GET',
            headers: {
                'Authorization': this.bearer!,
                ...this.headers,
            }
        })
        return await resp.json() as AssessmentInfo[]
    }

    async getTeacherCommentsAndResultsForAssessment(
        tenant: NumberOrString,
        learnerId: NumberOrString,
        assessmentId: NumberOrString
    ): Promise<TeacherAssessmentComment[]> {
        const url = `https://api-gateway.vsware.ie/assessment-service/control/assessment/${tenant}/result/term/learner/${learnerId}/${assessmentId}`
        const resp = await this.fetcher(url, {
            method: 'GET',
            headers: {
                'Authorization': this.bearer!,
                ...this.headers,
            }
        })
        return await resp.json() as TeacherAssessmentComment[]
    }
    
    async getOverviewCommentsForAssessment(
        tenant: NumberOrString,
        learnerId: NumberOrString,
        assessmentId: NumberOrString
    ): Promise<OverviewComment[]> {
        const url = `https://api-gateway.vsware.ie/assessment-service/control/assessment/${tenant}/comment/overview/${assessmentId}/${learnerId}`
        const resp = await this.fetcher(url, {
            method: 'GET',
            headers: {
                'Authorization': this.bearer!,
                ...this.headers,
            }
        })
        return await resp.json() as OverviewComment[]
    }

    async getBasicBehaviourData(learnerId: NumberOrString): Promise<BasicBehaviourResult> {
        const resp = await this.fetcher(`${this.controlBaseURL}/control/parental/${learnerId}/behaviour`, {
            method: 'GET',
            headers: this.headers,
        })
        return await resp.json() as BasicBehaviourResult
    }
    async getFullBehaviour(learnerId: NumberOrString): Promise<FullBehaviourResult> {
        const resp = await this.fetcher(`${this.controlBaseURL}/control/behaviour/incident/fetch/ALL/0/current?currentYear=true`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...this.headers,
            },
            body: learnerId.toString()
        })
        return await resp.json() as FullBehaviourResult
    }
        
}