/**
 * TypeScript "type" describing one aerodrome record from assets/data/data.json.
 *
 * Types do not exist at runtime — they are only for the compiler and your editor.
 * They catch mistakes early (e.g. typoing `item.phne`) and document what shape
 * each object in the JSON array is expected to have.
 */
export type Aerodrome = {
  /** Australian state/territory abbreviation, e.g. "SA" */
  state: string
  /** Display name, e.g. "Adelaide (Parafield)" */
  name: string
  /** ICAO code, e.g. "YPAD" for Adelaide — also used as the list key */
  identifier: string
  /** Has Terminal Aerodrome Forecast (TAF) service */
  taf: boolean
  /** Has 3-hour TAF service */
  taf3: boolean
  /** Has a ceilometer (cloud-base sensor) */
  ceilometer: boolean
  /** Has a visibility meter */
  vismeter: boolean
  /** AWIS phone number as shown to the user (may include spaces/brackets) */
  phone: string
}
