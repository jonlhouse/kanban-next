# Triage Labels

The skills speak in terms of canonical triage roles and work states. This file maps them to the actual label strings used in this repo's issue tracker.

| Canonical role             | Label in our tracker | Meaning                                  |
| -------------------------- | -------------------- | ---------------------------------------- |
| `needs-triage`             | `needs-triage`       | Maintainer needs to evaluate this issue  |
| `needs-info`               | `needs-info`         | Waiting on reporter for more information |
| `ready-for-agent`          | `ready-for-agent`    | Fully specified, ready for an AFK agent  |
| `ready-for-human`          | `ready-for-human`    | Requires human implementation            |
| `wontfix`                  | `wontfix`            | Will not be actioned                     |

Work states, for tickets from `/to-tickets`, set by `/implement`. A ticket carries one at a time, in place of `ready-for-agent`:

| Canonical role             | Label in our tracker | Meaning                                  |
| -------------------------- | -------------------- | ---------------------------------------- |
| `in-progress`              | `in-progress`        | An agent is building it                  |
| `awaiting-pr`              | `awaiting-pr`        | Committed on its spec's branch; the milestone PR closes it |

When a skill mentions a role (e.g. "apply the AFK-ready triage label"), use the corresponding label string from this table.

Edit the "Label in our tracker" column to match whatever vocabulary you actually use.
