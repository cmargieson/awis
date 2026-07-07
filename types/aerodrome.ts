/**
 * TypeScript "type" describing one aerodrome record from assets/data/data.json.
 *
 * Types do not exist at runtime — they are only for the compiler and your editor.
 * They catch mistakes early (e.g. typoing `item.phne`) and document what shape
 * each object in the JSON array is expected to have.
 */
export type Aerodrome = {
  state: string
  name: string
  /** ICAO code, e.g. "YPAD" for Adelaide */
  identifier: string
  taf: boolean
  taf3: boolean
  ceilometer: boolean
  vismeter: boolean
  phone: string
}
