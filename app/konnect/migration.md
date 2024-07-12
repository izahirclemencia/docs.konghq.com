---
title: Migrating from Kong Gateway On-Premises to Kong Konnect
---

The success of {{site.base_gateway}} can be attributed to its flexible deployment model, 
exceptional performance, broad extensibility, and Open Source and Enterprise licensing models.
This has resulted in a large deployment base over a variety of environments and topologies. 

As organizations grow and scale, they find a need for more advanced capabilities, 
such as strong multi-tenancy, federated API management, advanced security integrations, 
and more. With {{site.konnect_product_name}}, users have access to a full featured 
API management platform that builds on the lessons learned from deep customer 
usage of {{site.base_gateway}} and API management best practices.

This document will provide a guide for {{site.base_gateway}} users looking to migrate 
to {{site.konnect_product_name}}. 

## Migration Guide

The following will provide key details for completing a successful migration from {{site.base_gateway}} on-premises to 
{{site.konnect_product_name}}. This document focuses on migratring a [Hybrid](/gateway/{{page.release}}/production/deployment-topologies/#hybrid-mode) 
or [Traditional](/gateway/{{page.release}}/production/deployment-topologies/#traditional-database-mode)
deployment to Konnect, for other deployment modes see the following:

* [Kong Ingress Controller (KIC)](/kubernetes-ingress-controller/latest/)
    
    If you run KIC on premises, migrating to Konnect is straightforward. The [Kong Ingress Controller for Kubernetes Assocation](/konnect/gateway-manager/kic/)
    documentation provides details on linking your KIC deployment to a KIC based Control Plane
    in {{site.konnect_product_name}}.

* [DB-less mode](/gateway/{{page.release}}/production/deployment-topologies/db-less-and-declarative-config/)

    If you're running a DB-less deployment and interested in migrating to Konnect, Kong recommends migrating to 
    Hybrid mode deployment to take advantage of the full capabilities of Kong Konnect. Please reach out to
    a Kong representative for assistance with this migration.

### Role Based Access Controls

Both {{site.base_gateway}} and {{site.konnect_product_name}} provide Role Based Access Control (RBAC)
to manage administors and users of the API Management Platform. 

{{site.konnect_product_name}} provides a robust RBAC system that includes multiple levels with organizations, 
teams and roles. Konnect also provides integrations with IdP providers allowing you to map
centrally managed teams to Konnect based roles.

{{site.base_gateway}}'s RBAC system does not map directly to the authentication and authorization
system provided by {{site.konnect_product_name}}. Users migrating from {{site.base_gateway}} on-premises
to {{site.konnect_product_name}} have typically choosen to use Konnect's IdP integrations and 
take advantage of their existing IdP solution and Konnect team based mappings instead migrating 
their {{site.base_gateway}} on-premises RBAC configuration directly.

### Workspaces -> Control Planes

{{site.base_gateway}} supports configuration isolation using
[Workspaces](/gateway/{{page.release}}/kong-enterprise/workspaces/).
{{site.konnect_product_name}}'s model is more advanced and is solved 
using [Control Planes](/konnect/gateway-manager/#control-planes). When migrating 
to {{site.konnect_product_name}}, you will create a Control Plane design that 
best fits your goals, which may or may not mirror the number of Workspaces you
use on-premises.

If you currently use a single workspace in your on-premises installation,
you can simply create a matching Control Plane with the same name. Alternatively, 
you may choose to take the opportunity to re-organize your single Workspace configuration 
into multiple Control Planes if there is a clear separation of concerns in your gateway configuration.

If you're using multiple workspaces in your on-premises installation, the most straightforward
approach is to create a Control Plane for each workspace, but you may choose to reorganize your 
design during the migration.

{{site.base_gateway}} Workspaces also provide a way to share runtime infrastructure across isolated configurations.
With {{site.konnect_product_name}}, this is achieved using 
[Control Plane Groups](/konnect/gateway-manager/control-plane-groups/). Control Planes can be added
and removed from Control Plane Groups and setup to mirror your existing mutli-tenant Workspace configuration. 
Once you have Control Plane Groups setup, you can connect data plane instances to the group creating
a share data plane infrastructure. 

Managing Control Planes and Control Plane Groups in {{site.konnect_product_name}} can be 
achieved by using the [Konnect UI](/konnect/gateway-manager/), the
[Konnect Control Planes API](/konnect/api/control-planes/latest/), or the 
[Kong Konnect Terraform Provider](https://registry.terraform.io/providers/Kong/konnect/latest).

### Plugins

Konnect supports the majority of plugins available to {{site.base_gateway}}, however,
{{site.base_gateway}} is ran in Hybrid Mode which limits support for plugins that require direct access
to a database. 

{:.note}
> **Note**: Konnect also provides Dedicated Cloud Gateways which 
further limit plugins that require specialized software agents running on the dataplane hosts. 

In order to migrate plugins from on-premises to Konnect you should review 
[Konnect Compatibility page](https://docs.konghq.com/konnect/compatibility/) for your usage of unsupported
plugins. Additionally, review if certain configuration values are unsupported which will require additiona 
changes to your configuration.

### Custom Plugins

{{site.konnect_product_name}} supports custom plugins with similiar restrictions to pre-built plugins. Given 
that {{site.base_gateway}} runs in a Hybrid deployment mode, custom plugins may not access a database directly
and can not provide a custom Admin API endpoint. See the Konnect documentation for more details
on [Custom Plugin support](/konnect/gateway-manager/plugins/#custom-plugins) requirements.

Migrating custom plugins to Konnect requires uploading and associating your custom plugin's `schema.lua` file to 
the desired Control Plane. This can be done using the 
[Konnect UI](https://docs.konghq.com/konnect/gateway-manager/plugins/add-custom-plugin/) or the 
[Konnect Control Planes Config API](/konnect/api/control-plane-configuration/latest/#/Custom%20Plugin%20Schemas/list-plugin-schemas).

Just like in on-premises deployments, the custom plugin code must be distributed to the data plane instances.

{:.note}
> **Note**: Konnect's Dedicated Cloud Gateways can support custom plugins
but currently require a manual deployment process involving Kong Gateway's support personal. Contact your Kong representative
for more information.

### {{site.base_gateway}} Configuration

Typically the {{site.base_gateway}} configuration is migrated to {{site.konnect_product_name}} 
using [decK](/deck/latest/guides/konnect/), the declarative management tool for {{site.base_gateway}}
configurations.

The general process for migrating the configuration involves "dumping" your existing on-premises configuration
to a local file, modifying the configuration slightly to remove any workspace specific metadata,
and then sycnronizing the configuration to your desired Control Plane in {{site.konnect_product_name}}.

Assuming you are migrating each on-premises Workspace to a single Control Plane, the general psuedo code 
for migrating your configuration looks like the following:

* Use decK to dump your {{site.base_gateway}} configuration to a local file:

  `deck gateway dump --workspace <workspace-name> --output-file <workspace>.yaml`

* Edit the output file and remove the `_workspace` key from the configuration

* Syncronize the configuration to your desired Control Plane in {{site.konnect_product_name}}:

  `deck gateway sync --konnect-token $KONNECT_PATH --control-plane-name <cp-name> <workspace>.yaml`

In addition to the above process of using decK for the migration, {{site.konneect_product_name}} provides
other options for migrating your configuration.

* [Konnect Control Planes Config](/konnect/api/control-plane-configuration/latest/)
* [Kong Konnect Terraform Provider](/konnect/reference/terraform/)

### Data planes

The recommended approach for migrating your data plane instances to {{site.konnect_product_name}} is to
create new data plane instances connected to your Control Plane, validate their configuration and connectivity,
and then decomission the on-premises data plane instances.

The {{site.konnect_product_name}} documentation provides details on 
[{{site.base_gateway}} installation options](/konnect/gateway-manager/data-plane-nodes/). The easiest
way to deploy new data planes is using the Konnect Gateway Manager, which provides integrated 
launchers for popular operating systems and compute platforms. 

### APIOps

Konnect users will find that there are additional options for managing the API deployment lifecycle on
compared to {{site.base_gateway}} on-premises. 

If you're using [deck](/deck/latest) to manage your {{site.base_gateway}} configuration, you can continue to use
the tool to managing your {{site.konnect_product_name}} configuration. The decK CLI 
[supports Konnect Control Plane configuration](https://docs.konghq.com/deck/latest/guides/konnect/)
by providing additional flags that configure the tool to connect to a particular Control Plane using access tokens.

Additionally, {{site.konnect_product_name}} provides a Terraform provider for managing a full Konnect deployment 
including Control Planes, Control Plane Groups, data plane configuration and more. The 
[Kong Konnect Terraform Provider](https://docs.konghq.com/konnect/reference/terraform/) can be used independently
or in conjunction with decK to manage your API deployment lifecycle.

The [Kong Gateway Operator](/gateway-operator/latest/) is also available for teams 
that desire to use standardized Kubernetes APIs to manage their Konnect deployments.

## Next steps

If you are interested in assistence with migrating from {{site.base_gateway}} on-premises to 
{{site.konnect_product_name}}, please contact a Kong field representative.

