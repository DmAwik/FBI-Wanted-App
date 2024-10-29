export interface WantedListResponse {
  items: WantedItem[];
  total: number;
}

export interface WantedListRequest {
  items: OriginalWantedItem[];
  page: number;
  total: number;
}
export interface WantedItem {
  id: number;
  title: string;
  images: string;
  ageMin: number;
  ageMax: number;
  dateOfBirth: Date;
  heightMin: number;
  heightMax: number;
  weight: number;
  gender: string;
  placeOfBirth: string;
  nationality: string;
  caution: string;
  description: string;
  scarsAndMarks: string;
  race: string;
  files: string;
  isEdited?: boolean;
  [key: string]: any;
}
export interface OriginalWantedItem {
  id: string;
  additional_information: string;
  age_max: number;
  age_min: number;
  age_range: number;
  aliases: string;
  build: string;
  caution: string;
  complexion: string;
  coordinates: [];
  dates_of_birth_used: Date[];
  description: string;
  details: string;
  eyes: string;
  eyes_raw: string;
  field_offices: string[];
  files: { url: string }[];
  hair: string;
  hair_raw: string;
  height_max: number;
  height_min: number;
  images: { thumb: string }[];
  languages: [];
  legat_names: string;
  locations: string;
  modified: string;
  nationality: string;
  ncic: string;
  occupations: string;
  path: string;
  person_classification: string;
  place_of_birth: string;
  possible_countries: string;
  possible_states: string;
  poster_classification: string;
  publication: string;
  race: string;
  race_raw: string;
  remarks: string;
  reward_max: string;
  reward_min: string;
  reward_text: string;
  scars_and_marks: string;
  sex: string;
  status: string;
  subjects: [];
  suspects: string;
  title: string;
  uid: string;
  url: string;
  warning_message: string;
  weight: number;
  weight_max: number;
  weight_min: number;
}
