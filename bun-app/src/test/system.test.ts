import { test, expect, mock } from "bun:test";
import { appHost, appPort } from "../configs/common.config";
const host = `http://${appHost}:${appPort}`;

const data = {
  username: "wildananugrah",
  age: 33,
};

test("healtcheck db system", async () => {
  const responseGet = await fetch(`${host}/_/healthCheck`);
  expect(responseGet.ok).toBe(true);
  expect(responseGet.status).toBe(200);
});

test("route system 1", async () => {
  const responseGet = await fetch(`${host}/_/system/service1`);
  expect(responseGet.ok).toBe(true);
  expect(responseGet.status).toBe(200);

  const responsePost = await fetch(`${host}/_/system/service1`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  expect(responsePost.ok).toBe(true);
  expect(responsePost.status).toBe(200);

  const responsePut = await fetch(`${host}/_/system/service1`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  expect(responsePut.ok).toBe(true);
  expect(responsePut.status).toBe(200);

  const responseDelete = await fetch(`${host}/_/system/service1`, {
    method: "DELETE",
  });
  expect(responseDelete.ok).toBe(true);
  expect(responseDelete.status).toBe(200);
});

test("route system 2", async () => {
  const responseGet = await fetch(`${host}/_/system/service2`);
  expect(responseGet.ok).toBe(true);
  expect(responseGet.status).toBe(200);

  const responsePost = await fetch(`${host}/_/system/service2`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  expect(responsePost.ok).toBe(true);
  expect(responsePost.status).toBe(200);

  const responsePut = await fetch(`${host}/_/system/service2`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  expect(responsePut.ok).toBe(true);
  expect(responsePut.status).toBe(200);

  const responseDelete = await fetch(`${host}/_/system/service2`, {
    method: "DELETE",
  });
  expect(responseDelete.ok).toBe(true);
  expect(responseDelete.status).toBe(200);
});

test("route system 3", async () => {
  const responseGet = await fetch(`${host}/_/system/service3`);
  expect(responseGet.ok).toBe(true);
  expect(responseGet.status).toBe(200);

  const responsePost = await fetch(`${host}/_/system/service3`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  expect(responsePost.ok).toBe(true);
  expect(responsePost.status).toBe(200);

  const responsePut = await fetch(`${host}/_/system/service3`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  expect(responsePut.ok).toBe(true);
  expect(responsePut.status).toBe(200);

  const responseDelete = await fetch(`${host}/_/system/service3`, {
    method: "DELETE",
  });
  expect(responseDelete.ok).toBe(true);
  expect(responseDelete.status).toBe(200);
});
