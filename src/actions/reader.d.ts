/// <reference types="node" />
import * as Path from 'path';
import * as Q from 'q';
import * as vscode from 'vscode';
import * as J from '../';
import { JournalPageType } from '../ext/conf';
export interface FileEntry {
    path: string;
    name: string;
    scope: string;
    update_at: number;
    created_at: number;
    type: JournalPageType;
}
export interface BaseDirectory {
    path: string;
    scope: string;
}
/**
 * Anything which scans the files in the background goes here
 *
 */
export declare class Reader {
    ctrl: J.Util.Ctrl;
    constructor(ctrl: J.Util.Ctrl);
    /**
     * Loads previous entries. This method is async and is called in combination with the sync method (which uses the threshold)
     *
     * Update: ignore threshold
     *
     * @returns {Q.Promise<[string]>}
     * @memberof Reader
     */
    getPreviouslyAccessedFiles(thresholdInMs: number, callback: Function, picker: any, type: JournalPageType, directories: BaseDirectory[]): void;
    getPreviouslyAccessedFilesSync(thresholdInMs: number, directories: BaseDirectory[]): Q.Promise<FileEntry[]>;
    /**
     * Tries to infer the file type from the path by matching against the configured patterns
     * @param entry
     */
    inferType(entry: Path.ParsedPath): JournalPageType;
    /**
     * Scans journal directory and scans for notes
     *
     * Update: Removed age threshold, take everything
     * Update: switched to async with readdir
     *
     * See https://medium.com/@allenhwkim/nodejs-walk-directory-f30a2d8f038f
     * @param dir
     * @param callback
     */
    private walkDir;
    private walkDirSync;
    checkDirectory(d: Date, entries: string[]): Promise<void>;
    /**
     *  Returns a list of all local files referenced in the given document.
     *
     * @param {vscode.TextDocument} doc the current journal entry
     * @returns {Q.Promise<string[]>} an array with all references in  the current journal page
     * @memberof Reader
     */
    getReferencedFiles(doc: vscode.TextDocument): Q.Promise<vscode.Uri[]>;
    getFilesInNotesFolderAllScopes(doc: vscode.TextDocument, date: Date): Q.Promise<vscode.Uri[]>;
    /**
     * Returns a list of files sitting in the notes folder for the current document (has to be a journal page)
     *
     * @param {vscode.TextDocument} doc the current journal entry
     * @returns {Q.Promise<ParsedPath[]>} an array with all files sitting in the directory associated with the current journal page
     * @memberof Reader
     */
    getFilesInNotesFolder(doc: vscode.TextDocument, date: Date, scope: string): Q.Promise<vscode.Uri[]>;
    /**
     * Creates or loads a note
     *
     * @param {string} path
     * @param {string} content
     * @returns {Q.Promise<vscode.TextDocument>}
     * @memberof Writer
     */
    loadNote(path: string, content: string): Q.Promise<vscode.TextDocument>;
    /**
  * Returns the page for a day with the given input. If the page doesn't exist yet,
  * it will be created (with the current date as header)
  *
  * @param {input} input with offset 0 is today, -1 is yesterday
  * @returns {Q.Promise<vscode.TextDocument>} the document
  * @memberof Reader
  */
    loadEntryForInput(input: J.Model.Input): Q.Promise<vscode.TextDocument>;
    /**
     * Converts given path and filename into a full path.
     * @param pathname
     * @param filename
     */
    private resolvePath;
    /**
     * Loads the journal entry for the given date. If no entry exists, promise is rejected with the invalid path
     *
     * @param {Date} date the date for the entry
     * @returns {Q.Promise<vscode.TextDocument>} the document
     * @throws {string} error message
     * @memberof Reader
     */
    loadEntryForDate(date: Date): Q.Promise<vscode.TextDocument>;
}
