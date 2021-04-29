/*-
 * #%L
 * cmdb
 * %%
 * Copyright (C) 2021 TODO: Enter Organization name
 * %%
 * TODO: Define header text
 * #L%
 */
import { CmdbBase } from "../CmdbBase";

export class CmdbKangaroo extends CmdbBase {
    public Add() {
        this.recordId = this.getRandomInt()
        return "Kangaroo: added Name: " + this.recordName + " with size: " + this.recordSize + " Returned ID: " + this.recordId
    }
}
