---
title: Migrating from Kong Gateway On-Premises to Kong Konnect
---

The success of {{site.base_gateway}} can be attributed to its flexible deployment model, 
exceptional performance, broad extensibility, and Open Source and Enterprise licensing models.
This has resulted in a large deployment base over a variety of environments and topologies. 

As organizations grow and scale, they find a need for more advanced capabilities, 
such as strong multi-tenancy, federated API management, advanced security integrations, 
and more. {{site.konnect_product_name}} provides a full featured API management platform 
that builds on the lessons learned from deep customer usage of {{site.base_gateway}}. 

This document will provide a guide for {{site.base_gateway}} users (Open Source or Enterprise) 
looking to migrate to {{site.konnect_product_name}}. The document reviews the differences between 
{{site.base_gateway}} and {{site.konnect_product_name}} architecturally, and provides a guide 
for planning and executing a successful migration.

## Architectural Considerations - Kong Konnect vs Kong Gateway

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mattis facilisis nisi, 
id tempus urna venenatis ac. Quisque a commodo urna. Aliquam erat volutpat. Etiam non purus 
sit amet magna sollicitudin pretium. Sed non feugiat purus. Ut laoreet orci dui, eu 
ultrices nibh finibus sit amet.

### Security Model

{{site.konnect_product_name}} provides a modern authentication and authorization model 
designed to scale with your organization. {{site.konnnect_product_name}} users can define a hierarchy of 
[organizations, teams, and roles](/konnect/org-management/auth/) that maps to their 
organization's structure. Additionally, a strong integration with Identity Providers (IdP) is supported
allowing for easy mappings of IdP groups to {{site.konnnect_product_name}} teams.

With {{site.base_gateway}} on-prem, users only have the option to manage local administrators, 
users, and roles which can be challening to scale as your organization grows.

### Control Plane Architecture

{{site.base_gateway}} operations can be logically divided into a Control Plane (CP) and a Data Plane (DP).

With {{site.base_gateway}}, users choose a deployment mode, which includes 
[traditional, hybrid, and db-less](/gateway/latest/production/deployment-topologies/).


{{site.base_gateway}} supports Workspaces. Workspaces allow for isolated configurations
and adminstration via RBAC. All workspaces can then be ran on shared runtimes.

Kong Konnect supports a lightweight virtual Control Plane (CP) model. CPs are isolated
configurations that can be attached to runtimes and integrate seamlessly with the 
Konnect org/team model. 

Kong Konnect provides virtual Control Planes which provide a very lightweight way to isolate
Gateway configurations. CPs can be provisioned instantly and protected independently
using the Konnect org/team model.

### Data Plane Architecture

Cloud Gateway is an option...

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mattis facilisis nisi, 
id tempus urna venenatis ac. Quisque a commodo urna. Aliquam erat volutpat. Etiam non purus 
sit amet magna sollicitudin pretium. Sed non feugiat purus. Ut laoreet orci dui, eu 
ultrices nibh finibus sit amet.

### Multi-tenancy

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mattis facilisis nisi, 
id tempus urna venenatis ac. Quisque a commodo urna. Aliquam erat volutpat. Etiam non purus 
sit amet magna sollicitudin pretium. Sed non feugiat purus. Ut laoreet orci dui, eu 
ultrices nibh finibus sit amet.

Kong Konnect approaches multi-tenancy differently from on-premises. 

Konnect provides CP Groups which allows for runtime multi-tenancy to support
resource sharing in on-premise runtime deployments. CP Groups aggregate multiple CPs
into a single configuration at runtime. The CPGs detect runtime conflicts and allow
administrators to resolve them pre-deployment.

## Migration Strategies

### On-premises deployment modes

#### Traditional Mode

Here is what you need to think about

#### Hybrid Mode

Here is what you need to think about

#### Db-less Mode

Here is what you need to think about

### Workspaces -> CPs

* 1 WS to 1 CP strategy
* When only using the default workspace, migrate to a single CP or look for ways to isolate current configurations if desired
* Other strategies?

### RBAC -> Orgs/Teams

* EE Admins and users --> Konnect Teams
  * Generally migrating users have decided to utilize Idp integrations over migrating 
    local users and admins to fully utilize the new Konnect RBAC security model
* Konnect IdP mappings
  * Konnect uses the group in the token and the mapping table to assign a team

### Plugins

* Konnect supports a subset of all available plugins
* Custom plugins with DB access are not supported
* Konnect removes the runtime stateful datastore, simplifying runtime operation, but may affect some plugin capabilities
* OAuth2 for example requires a stateful datastore to persist tokens
    * Konnect provides IDP integrations OIDC which is a superior solution for operation identity managmeent over OAuth2
* List of compatible plugins ?
* List of incompatible plugins ?
    * alternatives?

## Runtime Multi-tenancy

CP Groups provide a way to share resources across multiple CPs. This is useful for 
resource optimization

## Service Hub

## Developer Portals

Integrating wiki doc: https://konghq.atlassian.net/l/cp/Uk64sQ8j

## Infrastructure as code

Migration to SaaS provides an opportunity advance your teams operational automation capabilities.
Terraform providers for Konnect are available to automate the provisioning of Konnect resources.
decK - what it means to use on Konnect vs on-prem

## Cloud Runtime Migrations

Konnect provides a full managed runtime environment on top of the virtual CPs and API management features.
Allowing an organization to move to a fully managed API management platform.

### Benefits of Not hosting a database 

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mattis facilisis nisi, id tempus urna venenatis ac. 
Quisque a commodo urna. Aliquam erat volutpat. Etiam non purus sit amet magna sollicitudin pretium. Sed non feugiat purus. 
Ut laoreet orci dui, eu ultrices nibh finibus sit amet.

### Migrating from on-prem runtimes to cloud gateways

Things to consider for cloud gateways

## Migration next steps

If  you are interested in assistence with migrating from Kong Gateway to Kong Konnect, please contact a Kong field representative.

