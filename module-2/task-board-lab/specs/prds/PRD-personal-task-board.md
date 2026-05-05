# Product Requirements Document (PRD)

## 1. Overview

### Purpose

Deliver a lightweight, offline-first personal task board for solo developers who manage work across 2–3 projects and need a fast alternative to heavy tools like Jira.

### Problem Statement

Solo developers typically juggle multiple projects (2–3 at a time) and need a quick way to track 30–100 active tasks without the setup overhead of enterprise tools. Existing tools are perceived as slow to configure and cluttered for single-user workflows, leading to context switching and lost time.

### Goals

- Enable a solo developer to create and organize a new board in under 2 minutes.
- Support managing up to 200 tasks across 3 columns with smooth drag-and-drop and keyboard shortcuts.
- Persist all tasks locally with zero backend dependency and instant reload from localStorage.

## 2. User Personas

### Who are we building for?

- **Aylin Demir (Solo Full-Stack Developer):** Works on 2–3 client projects simultaneously, wants a fast, offline-capable board to track tasks without team features or admin setup.
- **Emre Kaya (Indie Product Builder):** Manages a personal roadmap and daily tasks, prefers keyboard-driven workflows and minimal UI clutter.

## 3. Use Cases

### Key scenarios

- Aylin creates a new task in "To Do" and drags it to "In Progress" during a focus session.
- Emre uses keyboard shortcuts to add tasks, move them between columns, and mark them done without using the mouse.
- The app reloads and restores the board state instantly after a browser refresh.

## 4. Functional Requirements

### What the system must do

1. Provide a Kanban board with three fixed columns: **To Do**, **In Progress**, and **Done**.
2. Allow creating, editing, and deleting tasks with title and optional description.
3. Support drag-and-drop for moving tasks between columns and reordering within a column.
4. Provide keyboard shortcuts for: create task, move task left/right, move task up/down, and mark done.
5. Persist board state in `localStorage` and restore it on app load.
6. Work entirely in the browser without any backend or authentication.

## 5. Non-Functional Requirements

### Performance, security, reliability, and maintainability

- **Performance:** Initial load and board render under 1 second with 200 tasks on a mid-range laptop.
- **Security:** No external data transmission; all data remains in browser `localStorage`.
- **Reliability/Availability:** Board state is restored after refresh or tab close with no data loss in normal browser usage.
- **Scalability:** Support up to 200 tasks and 3 columns without noticeable UI lag (>60 FPS drag).
- **Maintainability:** React + Vite + TypeScript codebase with clear component boundaries and localStorage utilities.

## 6. Success Metrics

### How we measure success

1. **Setup speed:** 90% of users can create their first task within 2 minutes of first launch (measured in usability test).
2. **Task operations performance:** Drag-and-drop and keyboard actions complete in under 150 ms for 200-task boards.
3. **Persistence reliability:** 99% successful restore of task state after refresh in test runs over 100 reloads.

## 7. Scope

### In Scope

- Three-column Kanban board (To Do / In Progress / Done).
- Drag-and-drop task movement and ordering.
- Keyboard shortcuts for common task actions.
- localStorage persistence with instant reload.

### Out of Scope

- Multi-user collaboration or accounts.
- Backend APIs, cloud sync, or database storage.
- Custom columns, labels, or advanced project analytics.
