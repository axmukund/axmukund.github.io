---
layout: layouts/base.njk
tags:
  - posts
title: Nociceptive signaling in roughly 1500 words
description:
date: 2026-08-24
---
# Nociceptive signaling in roughly 1500 words

Pain can be understood in two ways: as a set of nervous system circuitry with associated pharmacology, or by stubbing your toe for the third time in as many days. Here we will be chiefly concerned with the first of those two approaches. 

Pain, like pornography, can be challenging to define. Also, like pornography, there is a standard definition that feels both technically correct and functionally useless. In this case, the definition comes from the International Association for the Study of Pain^{Citation available [here](https://journals.lww.com/pain/abstract/10.1097/j.pain.0000000000001939~the-revised-international-association-for-the-study-of-pain)}: 
> An unpleasant sensory and emotional experience associated with, or resembling that associated with, actual or potential tissue damage

We will primarily focus on pain as a result of actual tissue damage here. If you're annoyed at any errors or incompleteness, please remember that this is being written by a CA-1 waiting for their phone at an Apple Store. It's really your fault for trusting me. 

## Peripheral Tissue

Suppose some maniacal surgeon wants to cut you open to perform some emergent medically indicated procedure; say, an ankle ORIF. They decide to do this without any anesthesia, because they don't want to wait for an OR to become available. He grabs a scalpel and slices open your skin. [Quoting Roald Dahl](https://nymag.com/arts/books/features/67962/), you say "Ow, fuck!" What has happened? 

Well, someone cut open your skin. This led to a number of problems, but most principally the release of a number of mediators that activate peripheral nerve fibers. These mediators include:
* Prostaglandins, namely prostaglandin E$_{2}$
* Bradykinin
* Various cytokines
* Nerve growth factor (NGF)
* ATP and H$^{+}$

This then causes the firing of two types of peripheral nerve fibers that transmit pain: 
* A$\delta$ fibers -- these are fast, myelinated fibers that transmit "sharp pain" that is easily localized 
* C fibers -- these are slower, unmyelinated fibers that transmit "dull pain" that is burning, aching, and poorly localized

There are a few medications that we use for pain that act at this peripheral stage, that can be thought of as reducing the total _input_ signal entering the CNS pain pathways:
* NSAIDs such as ibuprofen/naproxen/ketorolac reduce the release of prostaglandins to desensitize nociceptors
* Local anesthetics such as lidocaine/bupivacaine/ropivacaine *directly* block sodium channel activity to prevent peripheral nerve signals from making it any further 

These nerve fibers then enter the CNS and, like all good afferents, synapse in the **dorsal root ganglion**. 
## The Dorsal Horn

The cell bodies of nociceptors -- those fun little A$\delta$ and C-fiber neurons -- lie primarily in the dorsal horn of the spinal cord. This is the site of a tremendous amount of signal processing, and where a number of receptors become clinically relevant. 

### Glutamate 

Perhaps the most important neurotransmitter at this stage is glutamate. The nociceptor terminals release glutamate into the synapse, triggers ascending pain pathways by acting on a number of different receptors. We will focus on two. The first is the **AMPA** receptor, which is a fast excitatory ion channel that depolarizes the next neuron in the chain by allowing for Na$^{+}$ and Ca$^{2+}$ influx^{Before you deride the name, it may be worth knowing that the AMPA receptor was first called the [quisqualate receptor](https://onlinelibrary.wiley.com/doi/10.1111/j.1471-4159.1982.tb10868.x) before the synthesis of the selective agonist AMPA in 1982.}. 

However, in addition to regular degular neurotransmission via the AMPA receptor, glutamate can also bind **NMDA receptor** ion channels. These receptors are the targets of two important perioperative analgesic drugs -- magnesium and ketamine -- and are thus worth some discussion. First, at resting membrane potential these receptors are bound by magnesium and thus blocked from opening. However, with repeated glutamatergic signaling, the membrane potential changes and the magnesium is displaced. Then, glutamate^{Or glycine, or D-serine, or aspartate, [etc etc](https://en.wikipedia.org/wiki/NMDA_receptor#Examples)} can bind, triggering channel opening and Ca$^{2+}$ influx. This functions to sensitize the downstream neuron to nociceptive signaling, akin to [turning up the gain](https://youtu.be/80QsDkoq8yM?si=vTVq3qOo6vebaqsx&t=47) on a signaling channel. Magnesium appears to prevent NMDAR activation via pore blockade and occupation at a pair of hydrated binding sites^{see [Stiegerwald et al 2026](https://www.nature.com/articles/s41593-026-02283-3) if you like Cryo-EM structures}, while ketamine appears to act _both_ via direct pore blockade and allosteric modulation of the channel^{See [Orser, Pennefather, and MacDonald 1997](https://www.ovid.com/jnls/anesthesiology/abstract/10.1097/00000542-199704000-00021~multiple-mechanisms-of-ketamine-blockade-of?redirectionsource=fulltextview) if you like reading older papers.}. 

### Substance P

Substance P is another one of those "neuropeptides" that gets thrown around a lot as a modulator of pain pathways and nociception, but mechanistically is maybe a little bit less clearly explained in standard textbooks^{Certainly the textbooks that I pretended to read while playing tetris during MS2 blocks...}. Substance P, released from ye olde DRG nociceptor cell bodies, binds to neurokinin-1 (NK1) receptors, which are GPCRs that couple with G$_{\mathrm{s}}$ and G$_{\mathrm{q}}$ G-proteins to drive ongoing, longer-lasting nociceptive signaling (as opposed to the shorter-term signaling from glutamate). NK1 receptors are also the targets of the anti-emetics aprepipant and fosaprepipant. There's probably some fun biology here, but I don't have the energy right now to put it all together. 

There are other neuropeptides, perhaps most notably CGRP (which is critical in [mechanical allodynia](https://pmc.ncbi.nlm.nih.gov/articles/PMC8245130/)), but we've only got so much attention span in [the modern age](https://www.youtube.com/watch?v=RzO7IGWGxu8&list=RDRzO7IGWGxu8&start_radio=1), so we'll keep it moving. 

## CNS 

Postsynaptic neurons with dendrites in the dorsal root then rise upward, traversing through the anterolateral system before arriving in the brain. There are a number of different systems that get triggered here, including but not limited to the somatosensory cortex, medial/limbic systems, and so on. These serve to define a localization of pain, and also encompass all of the emotional/autonomic/etc responses that characterize a large part of the experience of pain. 

### Opioids 

This here is a useful spot to talk about opioids, which are the mainstays of acute pain relief in a number of settings^{A review that I really liked was [this one](https://www.cell.com/cell/fulltext/S0092-8674(23)01180-7) by Che and Roth!}. Opioid receptors have a number of different ligands physiologically, and we group them all together mostly because morphine (the ur-opioid) basically binds all of them and swamps the system. 

There are four^{This is a lie, there are more, but there are only 3-4 ones that are particularly relevant to day-to-day clinical practice at this point.} types of opioid receptors: $\mu$ opioid receptors (MORs), $\delta$ opioid receptors (DORs), $\kappa$ opioid receptors (KORs), and nociceptive opioid receptors (NOPRs). There are several major classes of endogenous ligands for these receptors, and there is some level of combinatorial ligand-receptor specificity. The major ligands are endorphins, enkephalins, dynorphins, endomorphins, and nociceptin. MORs tend to bind most everything except for nociceptin, DORs tend to bind endorphins and enkephalins much more than dynorphins or endomorphins, KORs tend to mostly bind dynorphins, and NOPRs pretty much only bind nociceptin. Here's a chart with all this^{Full disclosure, I can never read charts, this is mostly useful as an act of construction, and even then only for me...}: 

|              | MOR    | DOR    | KOR  | NOPR |
| ------------ | ------ | ------ | ---- | ---- |
| endorphins   | High   | High   | Med  | Low  |
| dynorphins   | Medium | Medium | High | Low  |
| enkephalins  | High   | High   | Low  | Low  |
| endomorphins | High   | Low    | Low  | Low  |
| nociceptin   | Low    | Low    | Low  | High |
These different receptor classes aren't different "pain tracts" and there isn't some clear functional division between the three. Broadly, there is a tremendous amount of cross-talk between them, and significant ligand-receptor promiscuity that obfuscates any attempt at a simple mental model. On the whole, though, opioid receptors are Gi/o-coupled GPCRs that reduce intracellular cAMP, reducing presynaptic Ca$^{2+}$ leading to increased postsynaptic K$^+$ and neuronal hyperpolarization (read: inhibition of nociceptive neurons). Persistent activation of these opioid receptors can lead to receptor degradation via $\beta$-arrestin pathways, though the mechanisms of this and conditions that specifically lead to degradation are unclear^{At least, to my knowledge, which remains notably minimal.}. All that said, there are some rough shorthands that one can use to distinguish the various receptors: MORs are associated with powerful analgesia, reward, respiratory depression, and GI effects (this is a function of where MORs are expressed rather than some physiologically intentional or meaningful patterning); KORs are associated with analgesia but also dysphoria and aversive stress signaling; and DORs are *waves hand* a modulatory system that does... modulatory things. Broadly, most of the clinical pharmacology relevant to fentanyl/hydromorphone administration are a function of MORs, and much less so the other opioid receptors. 

Of note, MORs are expressed in a number of neuronal pathways, and opioids can thus produce effects on cholinergic and dopaminergic pathways. Opioid-triggered nausea and vomiting are thought to be caused by binding to opioid receptors in the chemotactic trigger zone in the area postrema, and opioid-induced bradycardia is thought to be due to disinhibition of cholinergic projections from the nucleus accumbens to the SA node. Similarly, opioid-mediated sedation is in part caused by anticholinergic activity in, among other regions, the lateral dorsal tegmental nucleus and the reticular formation, and opioid-induced catalepsy and muscular rigidity are thought to be due to inhibition of dopamine release caused by opioid receptor binding in the striatum and substantia nigra. 

Opioids, man. They do a lot. 

### Descending modulation 

In classic physiology fashion, circuits never travel in only one direction. Just as nociceptive circuitry transmits pain signals from the periphery to the cortex, so too does the cortex then communicate back to the spinal dorsal horn as a form of **descending modulation**. There are two major neural structures here, the periaqueductal gray (PAG) and rostral ventromedial medulla (RVM), but we will glob them together as the PAG/RVM. 

The PAG/RVM act together to modulate the strength of transmitted signals resulting from nociceptive input entering the spinal cord. For example, MOR binding in the PAG/RVM system leads to disinhibition of antinociceptive analgesic pathways in the spinal cord in nociceptive transmission (read: antinociceptive pathways are allowed to turn on), and this is one of the major ways opioids produce analgesia. This is to say that not only do opioids *directly* reduce nociceptive signaling by binding to MORs in ascending tracts, they also bind to MORs in the PAG/RVM and actively suppress those ascending nociceptive tracts. 

### Gabapentinoids

The two major gabapentinoids that I've come into contact with thus far are gabapentin and pregabalin. Both are derivatives of GABA (hence, *gaba*-pentinoids) which bind $\alpha 2\delta$ subunits of voltage-gated calcium channels (though they have also been found in contact with NMDA and AMPA receptors). By futzing with/inhibiting Ca$^{2+}$ influx, they inhibit neuronal signaling -- kind of like G$_{\mathrm{i}}$-coupled GPCRs. For more details, please consult literally anybody else. 




