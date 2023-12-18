/**
 * See Google Docs for more info:
 * https://github.com/googleapis/google-api-nodejs-client/blob/main/src/apis/calendar/v3.ts
 */
export interface Event {
  anyoneCanAddSelf?: boolean | null
  attachments?: EventAttachment[]
  attendees?: EventAttendee[]
  attendeesOmitted?: boolean | null
  colorId?: string | null
  conferenceData?: ConferenceData
  created?: string | null
  creator?: {
    displayName?: string
    email?: string
    id?: string
    self?: boolean
  } | null
  description?: string | null
  end?: EventDateTime
  endTimeUnspecified?: boolean | null
  etag?: string | null
  eventType?: string | null
  extendedProperties?: {
    private?: { [key: string]: string }
    shared?: { [key: string]: string }
  } | null
  focusTimeProperties?: {
    autoDeclineMode?: string | null
    chatStatus?: string | null
    declineMessage?: string | null
  }
  gadget?: {
    display?: string
    height?: number
    iconLink?: string
    link?: string
    preferences?: { [key: string]: string }
    title?: string
    type?: string
    width?: number
  } | null
  guestsCanInviteOthers?: boolean | null
  guestsCanModify?: boolean | null
  guestsCanSeeOtherGuests?: boolean | null
  hangoutLink?: string | null
  htmlLink?: string | null
  iCalUID?: string | null
  id: string // Modified
  kind?: string | null
  location?: string | null
  locked?: boolean | null
  organizer?: {
    displayName?: string
    email?: string
    id?: string
    self?: boolean
  } | null
  originalStartTime?: EventDateTime
  outOfOfficeProperties?: {
    autoDeclineMode?: string | null
    declineMessage?: string | null
  }
  privateCopy?: boolean | null
  recurrence?: string[] | null
  recurringEventId?: string | null
  reminders?: {
    overrides?: EventReminder[]
    useDefault?: boolean
  } | null
  sequence?: number | null
  source?: { title?: string; url?: string } | null
  start?: EventDateTime
  status?: string | null
  summary?: string | null
  transparency?: string | null
  updated?: string | null
  visibility?: string | null
  workingLocationProperties?: {
    customLocation?: { label?: string } | null
    homeOffice?: any | null
    officeLocation?: {
      buildingId?: string
      deskId?: string
      floorId?: string
      floorSectionId?: string
      label?: string
    } | null
    type?: string | null
  }
}

interface EventAttachment {
  fileId?: string | null
  fileUrl?: string | null
  iconLink?: string | null
  mimeType?: string | null
  title?: string | null
}

interface EventAttendee {
  additionalGuests?: number | null
  comment?: string | null
  displayName?: string | null
  email?: string | null
  id?: string | null
  optional?: boolean | null
  organizer?: boolean | null
  resource?: boolean | null
  responseStatus?: string | null
  self?: boolean | null
}

interface EventDateTime {
  date?: string | null
  dateTime?: string | null
  timeZone?: string | null
}

interface EventReminder {
  method?: string | null
  minutes?: number | null
}

interface ConferenceData {
  conferenceId?: string | null
  conferenceSolution?: {
    iconUri?: string | null
    key?: ConferenceSolutionKey
    name?: string | null
  }
  createRequest?: {
    conferenceSolutionKey?: ConferenceSolutionKey
    requestId?: string | null
    status?: {
      statusCode?: string | null
    }
  }
  entryPoints?: EntryPoint[]
  notes?: string | null
  parameters?: {
    addOnParameters?: {
      parameters?: { [key: string]: string } | null
    }
  }
  signature?: string | null
}

interface ConferenceSolutionKey {
  type?: string | null
}

interface EntryPoint {
  accessCode?: string | null
  entryPointFeatures?: string[] | null
  entryPointType?: string | null
  label?: string | null
  meetingCode?: string | null
  passcode?: string | null
  password?: string | null
  pin?: string | null
  regionCode?: string | null
  uri?: string | null
}

export type SyncEvent = Event & { checked?: boolean }
