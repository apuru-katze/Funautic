<ElicitationsGroup>

# 📖 Installation & Performance Tuning Guide

To ensure this modpack runs smoothly and stably, we highly recommend following the RAM allocation and JVM Arguments guide below.

### 💻 System Requirements (RAM)

- **Minimum:** 6 GB (6144 MB)
- **Recommended:** 8 GB (8192 MB)

---

### 🚀 Installation & Setup

Choose your preferred launcher below for step-by-step instructions:

#### Using the Modrinth App (Official)

1. Open the **Modrinth App**, search for this modpack, and click **Install**. (Alternatively, click the `+` icon and select _Import from file_ if you are using a manual `funautic.mrpack` file).
2. Once installed, do not click Play just yet. Click on your modpack's profile icon to open its details page.
3. Click the **Options** (Gear icon) at the top.
4. Scroll down to the **Java Settings** section.
5. Under **Memory allocation**, adjust the slider to between **6000 MB (6GB)** and **8000 MB (8GB)**.
6. In the **JVM Arguments** field, copy and paste the following code:
   ```text
   -XX:+UseStringDeduplication -XX:+ParallelRefProcEnabled -XX:+AlwaysPreTouch -XX:+PerfDisableSharedMem -XX:+UnlockExperimentalVMOptions -XX:+UseG1GC -XX:G1NewSizePercent=20 -XX:G1ReservePercent=20 -XX:MaxGCPauseMillis=50 -XX:G1HeapRegionSize=32M -XX:SurvivorRatio=32 -XX:MaxTenuringThreshold=1 -javaagent:unsup.jar
   ```
7. You are all set! You can now go back and click **Play**.

### ⚠️ IMPORTANT NOTICE: About `unsup.jar`

Inside the JVM arguments provided above, there is a `-javaagent:unsup.jar` command.
To prevent your game from crashing upon startup, ensure that the `unsup.jar` file is located in the main (root) folder of your modpack's Instance. (If this file is already included in the modpack's `overrides` folder, it will be installed automatically). If the game fails to start, please check your installation folder to make sure the `unsup.jar` file is present.

---

_Made by Gemini AI_
