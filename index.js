import open from "open";

const url = "https://devops.oci.oraclecorp.com/shepherd/projects/maui-templates/flocks/maui-preact-plugin/releases";

open(url).catch((err) => {
    console.error("Failed to open URL:", err);
});