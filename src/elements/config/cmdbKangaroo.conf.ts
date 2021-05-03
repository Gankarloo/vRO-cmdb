/*-
 * #%L
 * cmdb
 * %%
 * Copyright (C) 2021 TODO: Enter Organization name
 * %%
 * TODO: Define header text
 * #L%
 */
import { Configuration } from "vrotsc-annotations";

@Configuration({
    name: "kangaroo json",
    path: "CGI/Handson",
})
export class cmdbKangarooConf {
    hostname: "kangaroo.server.local";
    port: 443;
}
