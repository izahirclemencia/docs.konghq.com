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

This document will provide a guide for {{site.base_gateway}} users (Open Source or Enterprise) 
looking to migrate to {{site.konnect_product_name}}. 

## Migration Guide

The following will detail key steps to complete a successful migration from {{site.base_gateway}} to 
{{site.konnect_product_name}}. This document focuses on migratring an on-premsies Hybrid or Traditional
deployment to Konnect, for other deployment modes see the following:

* Kong Ingress Controller (KIC):
    
    If you run Kong Ingress Controller on premises, 
    migrating to Konnect is simple. Here are the instructions (docs link and/or summary recap).

* DB-less mode

    We recommend migrating to Hybrid mode to take advantage of the full capabilities of Kong Konnect.

### Role Based Access Controls

Both {{site.base_gateway}} and {{site.konnect_product_name}} provide Role Based Access Control (RBAC)
to manage administors and users of the API Platform. 

{{site.konnect_product_name}} provides a robust RBAC system that includes multiple levels with organizations, 
teams and roles. Konnect also provides integrations with IdP providers allowing you to map
centrally managed teams to Konnect based roles.

{{site.base_gateway}}'s RBAC system does not map directly to the authentication and authorization
system provided by {{site.konnect_product_name}}. Users migrating from {{site.base_gateway}} on-premises
to {{site.konnect_product_name}} are encouraged to use the IdP integrations and 
take advantage of centralized IdP based RBAC.

### Migrating Workspaces 

For each workspace in your on-premises {{site.base_gateway}} installation, create a {{site.konnect_product_name}}
[Control Plane](/konnect/gateway-manager/#control-planes).

If you currently use multiple workspaces to share runtime infrastructure, the equivalent 
solution with {{site.konnect_product_name}} is [Control Plane Groups](/konnect/gateway-manager/control-plane-groups/).

Managing Control Planes and Control Plane Groups in {{site.konnect_product_name}} can be achieved by using the
[Konnect Control Planes API](/konnect/api/control-planes/latest/) or the 
[Kong Konnect Terraform Provider](https://registry.terraform.io/providers/Kong/konnect/latest).

### Migrating Kong Gateway Configuration

Migrating the Kong Gateway configuration to {{site.konnect_product_name}} can be done using the
[Deck CLI](/deck/latest/guides/konnect/).

* Deck dump from your existing Kong Gateway installation
  `deck dump --workspace <workspace-name> --output-file <workspace>.yaml`
* 
Remove the _workspace key
Note your CP Id from the Konnect UI or Konnect API
Run deck sync --control-plane-id X (include how to add konnect auth details for deck)
List potential failure modes

Additional options to decK include migrating to the Konnect Gateway Entities API or 
the Kong Konnect Terraform Provider.

### Data Plane Migration to Konnect

* How to attach a new DP to Konnect
* How to take a running DP and switch it's data source to Konnect

### APIOps Migration

* What information can we provide to a general audience with this?

## Migration next steps

If  you are interested in assistence with migrating from Kong Gateway to 
{{site.konnect_product_name}}, please contact a Kong field representative.

